import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { CreateGamePlayerViewmodel } from "./create-game-player.viewmodel";
import { Type } from "class-transformer";

export class CreateGameViewmodel {
  @IsString()
  @MaxLength(150)
  @IsOptional()
  name: string = "";

  @IsString()
  @MaxLength(500)
  @IsOptional()
  password?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  initialAmount: number = 0;

  @IsArray()
  @Type(() => CreateGamePlayerViewmodel)
  @ArrayMinSize(2)
  @ArrayMaxSize(100)
  players!: CreateGamePlayerViewmodel[];
}
