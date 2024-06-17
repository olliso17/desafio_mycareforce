import { Test, TestingModule } from '@nestjs/testing';
import { LoginUsecase } from './login.usecase';
import { UserRepository } from '../../infra/user/user.repository';
import { LoginRepository } from '../../infra/login/login.repository';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '../../infra/cache/cache.service';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('bcryptjs');
jest.mock('os');

describe('LoginUsecase', () => {
  let loginUsecase: LoginUsecase;
  let userRepository: jest.Mocked<UserRepository>;
  let loginRepository: jest.Mocked<LoginRepository>;
  let jwtService: jest.Mocked<JwtService>;
  let cacheService: jest.Mocked<CacheService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUsecase,
        {
          provide: UserRepository,
          useFactory: () => ({
            findAll: jest.fn(),
          }),
        },
        {
          provide: LoginRepository,
          useFactory: () => ({
            createLogin: jest.fn(),
          }),
        },
        {
          provide: JwtService,
          useFactory: () => ({
            signAsync: jest.fn().mockResolvedValue('mocked_token'),
          }),
        },
        {
          provide: CacheService,
          useFactory: () => ({
            storeData: jest.fn(),
          }),
        },
      ],
    }).compile();

    loginUsecase = module.get<LoginUsecase>(LoginUsecase);
    userRepository = module.get<UserRepository>(UserRepository) as jest.Mocked<UserRepository>;
    loginRepository = module.get<LoginRepository>(LoginRepository) as jest.Mocked<LoginRepository>;
    jwtService = module.get<JwtService>(JwtService) as jest.Mocked<JwtService>;
    cacheService = module.get<CacheService>(CacheService) as jest.Mocked<CacheService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw UnauthorizedException when credentials are invalid', async () => {
    const userInput = {
      email: 'invalid@example.com',
      password: 'invalid_password',
    };

    userRepository.findAll.mockResolvedValue([]); 

    await expect(loginUsecase.execute(userInput)).rejects.toThrow(UnauthorizedException);
    expect(userRepository.findAll).toHaveBeenCalled();
    expect(jwtService.signAsync).not.toHaveBeenCalled();
    expect(loginRepository.createLogin).not.toHaveBeenCalled();
    expect(cacheService.storeData).not.toHaveBeenCalled();
  });

});
