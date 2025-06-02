import { IsNumber, IsPositive, IsString, Max, Min } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(100)
  level: number;
}
