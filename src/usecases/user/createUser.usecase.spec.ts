import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../infra/user/user.repository';
import { LoginRepository } from '../../infra/login/login.repository';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '../../infra/cache/cache.service';
import { CreateUserInputDto } from '../../infra/user/dto/create.user.dto';
import User from '../../infra/user/user.entity';
import { Login } from '../../infra/login/login.entity';
import { CreateUseUsecase } from './createUser.usecase';

const bcrypt = require('bcryptjs');
const os = require('os');

jest.mock('bcryptjs');
jest.mock('os');

describe('CreateUseUsecase', () => {
    let createUseUsecase: CreateUseUsecase;
    let userRepository: jest.Mocked<UserRepository>;
    let loginRepository: jest.Mocked<LoginRepository>;
    let jwtService: jest.Mocked<JwtService>;
    let cacheService: jest.Mocked<CacheService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUseUsecase,
                {
                    provide: UserRepository,
                    useFactory: () => ({
                        create: jest.fn(),
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
                        signAsync: jest.fn(),
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

        createUseUsecase = module.get<CreateUseUsecase>(CreateUseUsecase);
        userRepository = module.get<UserRepository>(UserRepository) as jest.Mocked<UserRepository>;
        loginRepository = module.get<LoginRepository>(LoginRepository) as jest.Mocked<LoginRepository>;
        jwtService = module.get<JwtService>(JwtService) as jest.Mocked<JwtService>;
        cacheService = module.get<CacheService>(CacheService) as jest.Mocked<CacheService>;
    });

    it('should create a user successfully', async () => {
        const networkInterfacesMock = {
            lo: [{ address: '127.0.0.1' }],
        };
        os.networkInterfaces.mockReturnValue(networkInterfacesMock);
        bcrypt.hashSync.mockReturnValue('hashed_value');

        const userInput: CreateUserInputDto = {
            name: 'test',
            email: 'test@test.com',
            password: 'password',
        };
        const userOutput = new User(userInput);
        userOutput.id = '1';

        const tokenOutput = 'mocked_token';
        const loginProps = {
            token: 'testtoken',
            user_id: 'user1',
            localhost: 'localhost',
        }
        userRepository.create.mockResolvedValue(userOutput);
        jwtService.signAsync.mockResolvedValue(tokenOutput);
        loginRepository.createLogin.mockResolvedValue(new Login(loginProps));
        cacheService.storeData.mockResolvedValue(null);

        const result = await createUseUsecase.create(userInput);

        expect(result).toEqual({
            message: 'created successfully',
            token: tokenOutput,
            id: userOutput.id,
        });
        expect(userRepository.create).toHaveBeenCalledWith(expect.any(User));
        expect(jwtService.signAsync).toHaveBeenCalledWith({
            userEmail: 'hashed_value',
            userName: 'test',
        });
        expect(loginRepository.createLogin).toHaveBeenCalledWith(expect.any(Login));
        expect(cacheService.storeData).toHaveBeenCalledWith(tokenOutput);
    });

    it('should return an error message when user creation fails', async () => {
        const networkInterfacesMock = {
            lo: [{ address: '127.0.0.1' }],
        };
        os.networkInterfaces.mockReturnValue(networkInterfacesMock);
        bcrypt.hashSync.mockReturnValue('hashed_value');

        const userInput: CreateUserInputDto = {
            name: 'test',
            email: 'test@test.com',
            password: 'password',
        };

        const errorMessage = 'Creation failed';
        userRepository.create.mockRejectedValue(new Error(errorMessage));
        jwtService.signAsync.mockResolvedValue('mocked_token');

        const result = await createUseUsecase.create(userInput);

        expect(result).toEqual({
            message: "credentials invalidError: Creation failed mocked_token",
        });
    });
});
