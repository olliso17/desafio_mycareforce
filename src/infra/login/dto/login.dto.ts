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

}

export class LoginOutputDto {
  @IsString()
  @ApiProperty({
    description: "Enter message optional",
    example: "login successfully",
  })
  message: string;

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
