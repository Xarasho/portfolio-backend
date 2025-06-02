import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { ResumeModule } from './resume/resume.module';
import { ActivityModule } from './activity/activity.module';
import { SoftSkillModule } from './soft-skill/soft-skill.module';
import { EducationModule } from './education/education.module';

@Module({
  imports: [ProfileModule, ResumeModule, ActivityModule, SoftSkillModule, EducationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
