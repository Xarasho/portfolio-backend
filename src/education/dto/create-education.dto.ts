import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1900)
  @Max(2000)
  start: number;

  @IsNumber()
  @Min(1900)
  @Max(2000)
  end?: number;

  @IsString()
  content: string;
}
