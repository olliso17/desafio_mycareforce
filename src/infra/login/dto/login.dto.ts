import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { randomUUID } from "crypto";

export class LoginInputDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Enter email",
    example: "email@email.com",
  })
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({
    description: "Enter password",
    example: "123456adas",
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: "User id is not found" })
  @ApiProperty({
    description: "Enter user id",
    example: randomUUID,
  })
  user_id: string;
}

export class LoginOutputDto {
  @IsString()
  @ApiProperty({
    description: "Error message or token",
    example: { message: "Error" },
  })
  message: string;
}
