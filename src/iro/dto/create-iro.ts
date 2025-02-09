import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateIRODto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  impactScore: number;
}
