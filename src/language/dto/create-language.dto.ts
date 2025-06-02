import { IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  level: number;
}
