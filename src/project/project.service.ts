import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClient } from 'generated/prisma';

// TODO: Add image service

@Injectable()
export class ProjectService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createProjectDto: CreateProjectDto, image: Express.Multer.File) {
    console.log({ createProjectDto, image });
  }

  findAll() {
    return this.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.project.findFirst({
      where: { id },
    });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  remove(id: string) {
    return this.project.delete({ where: { id } });
  }
}
