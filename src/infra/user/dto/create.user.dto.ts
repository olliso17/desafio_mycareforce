import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { randomUUID } from "crypto";

export class CreateUserInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Enter name",
    example: "Francisco",
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Enter email",
    example: "email@example.com",
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Enter password",
    example: "123456abc@4",
  })
  password: string;
}

export class CreateUserOutputDto {
  @IsString()
  @ApiProperty({
    description: "Enter message optional",
    example: "created successfully",
  })
  message?: string;

  @IsString()
  @ApiProperty({
    description: "Enter token optional",
    example: randomUUID(),
  })
  token?: string;

  @IsString()
  @ApiProperty({
    description: "Enter id optional",
    example: randomUUID(),
  })
  id?: string;
}