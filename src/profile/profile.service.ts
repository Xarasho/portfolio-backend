import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PrismaClient } from '@prisma/client';
import { OnModuleInit } from '@nestjs/common';

@Injectable()
export class ProfileService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createProfileDto: CreateProfileDto) {
    return this.profile.create({
      data: createProfileDto,
    });
  }

  findOne() {
    return this.profile.findFirst();
  }

  remove(id: string) {
    return this.profile.delete({ where: { id } });
  }
}
