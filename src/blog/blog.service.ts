import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PrismaClient } from '@prisma/client';
import { UploaderService } from 'src/services/uploader/s3.service';
import { v4 } from 'uuid';

@Injectable()
export class BlogService extends PrismaClient implements OnModuleInit {
  constructor(private readonly uploaderService: UploaderService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async create(createBlogDto: CreateBlogDto, image: Express.Multer.File) {
    // return this.blog.create({
    //   data: createBlogDto,
    // });
    const blog = await this.blog.create({
      data: {
        ...createBlogDto,
        image: v4(),
      },
    });
    await this.uploaderService.upload(image, blog.image as string);
  }

  async findAll() {
    // return this.blog.findMany({
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // });
    const blogs = await this.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return await Promise.all(
      blogs.map(async (blog) => {
        const url = await this.uploaderService.getSignedUrl(
          blog.image as string,
        );
        return { ...blog, image: url };
      }),
    );
  }

  findOne(id: string) {
    return this.blog.findFirst({ where: { id } });
  }

  async remove(id: string) {
    // return this.blog.delete({ where: { id } });
    const blog = await this.blog.delete({
      where: { id },
    });

    await this.uploaderService.delete(blog.image as string);
  }
}
