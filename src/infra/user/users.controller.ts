import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  Req,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LoginUsecase } from "../../usecases/login/login.usecase";
import { AuthGuard, Public } from "../auth/auth.guard";
import { EditPasswordUserInputDto } from "./dto/edit-user.dto";
import CreateUseUsecase from "../../usecases/user/createUser.usecase";
import EditPasswordUserUsecase from "../../usecases/user/edit.user.usecase";
import { CreateUserInputDto } from "./dto/create.user.dto";
import FindUserByIdUsecase from "../../usecases/user/find.by.user.id";

@ApiTags('users')
@Controller()
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}
  constructor(
    private readonly createUser: CreateUseUsecase,
    private readonly editPasswordUser: EditPasswordUserUsecase,
    private readonly loginUser: LoginUsecase,
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

  @Public()
  @Patch("user/edit_password")
  editUserPassword(@Body() editUserPassword: EditPasswordUserInputDto) {
    return this.editPasswordUser.execute(editUserPassword);
  }
  
}
