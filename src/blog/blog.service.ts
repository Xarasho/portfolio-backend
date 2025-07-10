import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BlogService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createBlogDto: CreateBlogDto) {
    return this.blog.create({
      data: createBlogDto,
    });
  }

  findAll() {
    return this.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.blog.findFirst({ where: { id } });
  }

  remove(id: string) {
    return this.blog.delete({ where: { id } });
  }
}
