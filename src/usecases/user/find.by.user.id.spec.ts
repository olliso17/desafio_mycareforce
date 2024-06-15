import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../infra/user/user.repository';
import User from '../../infra/user/user.entity';
import { FindUserByIdUsecase } from './find.by.user.id';

describe('FindUserByIdUsecase', () => {
  let findUserByIdUsecase: FindUserByIdUsecase;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdUsecase,
        {
          provide: UserRepository,
          useFactory: () => ({
            find: jest.fn(),
          }),
        },
      ],
    }).compile();

    findUserByIdUsecase = module.get<FindUserByIdUsecase>(FindUserByIdUsecase);
    userRepository = module.get<UserRepository>(UserRepository) as jest.Mocked<UserRepository>;
  });

  it('should find a user by id', async () => {
    const userId = '1';
    const userMock = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password',
    });

    userRepository.find.mockResolvedValue(userMock);

    const result = await findUserByIdUsecase.execute(userId);

    expect(result).toEqual(userMock);
    expect(userRepository.find).toHaveBeenCalledWith(userId);
  });

  it('should return an error message when user is not found', async () => {
 
    const userId = '2';
    const errorMessage = 'user not found';
    
    userRepository.find.mockResolvedValue(undefined);

    const result = await findUserByIdUsecase.execute(userId);

    expect(result).toEqual({ message: errorMessage });
    expect(userRepository.find).toHaveBeenCalledWith(userId);
  });
});
