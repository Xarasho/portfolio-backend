import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { ResumeModule } from './resume/resume.module';

@Module({
  imports: [ProfileModule, ResumeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
