import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { LoginUsecase } from '../../usecases/login/login.usecase';
import CreateUseUsecase from '../../usecases/user/createUser.usecase';
import { LoginRepository } from '../login/login.repository';
import FindUserByIdUsecase from '../../usecases/user/find.by.user.id';
import EditPasswordUserUsecase from '../../usecases/user/edit.user.usecase';

describe('UsersController', () => {
  let controller: UsersController;
  let userRepository: UserRepository;
  let createUserUsecase: CreateUseUsecase;
  let loginRepository: LoginRepository;
  let editPasswordUserUsecase: EditPasswordUserUsecase;
  let findUserByIdUsecase: FindUserByIdUsecase;
  let loginUsecase: LoginUsecase;

  beforeEach(() => {
    const typeOrmMock: any = {};
    userRepository = new UserRepository(typeOrmMock);
    loginRepository = new LoginRepository(typeOrmMock);
    createUserUsecase = new CreateUseUsecase(userRepository, loginRepository);
    editPasswordUserUsecase = new EditPasswordUserUsecase(userRepository);
    findUserByIdUsecase = new FindUserByIdUsecase(userRepository);
    loginUsecase = new LoginUsecase(userRepository, loginRepository)
    controller = new UsersController(createUserUsecase, editPasswordUserUsecase,  loginUsecase, findUserByIdUsecase)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
