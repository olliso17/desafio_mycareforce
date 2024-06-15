import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login, LoginProps } from '../../infra/login/login.entity';
import { LoginRepository } from './login.repository';

describe('LoginRepository', () => {
  let loginRepository: LoginRepository;
  let typeOrmLoginRepository: Repository<Login>;

  const mockLoginProps: LoginProps = {
    token: 'testtoken',
    user_id: 'user1',
    localhost: 'localhost',
  };

  const mockLogin: Login = new Login(mockLoginProps);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginRepository,
        {
          provide: getRepositoryToken(Login),
          useClass: Repository,
        },
      ],
    }).compile();

    loginRepository = module.get<LoginRepository>(LoginRepository);
    typeOrmLoginRepository = module.get<Repository<Login>>(getRepositoryToken(Login));
  });

  it('should be defined', () => {
    expect(loginRepository).toBeDefined();
  });

  it('should create a new login', async () => {
    jest.spyOn(typeOrmLoginRepository, 'save').mockResolvedValue(mockLogin);
    const login  = new Login(mockLoginProps)
    expect(await loginRepository.createLogin(login)).toEqual(mockLogin);
    expect(typeOrmLoginRepository.save).toHaveBeenCalledWith(mockLogin);
  });
});
