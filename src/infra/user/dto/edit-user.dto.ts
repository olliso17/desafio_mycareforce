import { ApiProperty } from "@nestjs/swagger";

export class EditPasswordUserInputDto{
    @ApiProperty({
        description: "Enter email",
        example: "email@example.com"
    })
    email: string;
    @ApiProperty({
        description: "Enter password",
        example: "123456abc@4"
    })
    password: string;
    @ApiProperty({
        description: "Enter new password",
        example: "123waw56abc@4"
    })
    new_password:string
}