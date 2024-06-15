import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard, Public } from "../auth/auth.guard";
import {CreateUseUsecase} from "../../usecases/user/createUser.usecase";
import { CreateUserInputDto } from "./dto/create.user.dto";
import {FindUserByIdUsecase} from "../../usecases/user/find.by.user.id";

@ApiTags('users')
@Controller()
export class UsersController {
  
  constructor(
    private readonly createUser: CreateUseUsecase,
    private readonly findUser: FindUserByIdUsecase,
  ) {}

  @Public()
  @Post("user/create")
  create(@Body() createUserDto: CreateUserInputDto) {
    return this.createUser.create(createUserDto);
  }

  @Get("user/:id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  findOne(@Param("id") id: string) {
    return this.findUser.execute(id);
  }

  
}
