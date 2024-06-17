import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { LoginUsecase } from '../../usecases/login/login.usecase';
import { LoginRepository } from '../login/login.repository';
import { FindUserByIdUsecase } from '../../usecases/user/find.by.user.id';
import { CreateUseUsecase } from '../../usecases/user/createUser.usecase';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '../cache/cache.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userRepository: UserRepository;
  let createUserUsecase: CreateUseUsecase;
  let loginRepository: LoginRepository;
  let findUserByIdUsecase: FindUserByIdUsecase;
  let loginUsecase: LoginUsecase;
  let jwtService: JwtService;
  let cacheService: CacheService;
  beforeEach(() => {
    const typeOrmMock: any = {};
    userRepository = new UserRepository(typeOrmMock);
    loginRepository = new LoginRepository(typeOrmMock);
    jwtService = new JwtService(typeOrmMock)
    cacheService = new CacheService(typeOrmMock)
    createUserUsecase = new CreateUseUsecase(userRepository, loginRepository, jwtService, cacheService);
    findUserByIdUsecase = new FindUserByIdUsecase(userRepository);
    loginUsecase = new LoginUsecase(userRepository, loginRepository, jwtService, cacheService)
    controller = new UsersController(createUserUsecase, findUserByIdUsecase)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
