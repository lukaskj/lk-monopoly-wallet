import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGamePlayerViewmodel {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  color: string = "#ffffff";
}
