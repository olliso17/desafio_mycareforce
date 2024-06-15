import { JwtService } from "@nestjs/jwt";
import { LoginUsecase } from "../../usecases/login/login.usecase";
import { LoginRepository } from "../login/login.repository";
import { UserRepository } from "../user/user.repository";
import { AuthController } from "./auth.controller";
import { CacheService } from "../../cache/cache.service";


describe('AuthController', () => {
  let controller: AuthController;
  let userRepository: UserRepository;
  let loginRepository: LoginRepository;
  let jwtService: JwtService;
  let cacheService: CacheService;
  let loginUsecase: LoginUsecase;
  beforeEach(() => {
    const typeOrmMock: any = {};
    userRepository = new UserRepository(typeOrmMock);
    loginRepository = new LoginRepository(typeOrmMock);
    loginUsecase = new LoginUsecase(userRepository, loginRepository, jwtService, cacheService)
    controller = new AuthController(loginUsecase)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
