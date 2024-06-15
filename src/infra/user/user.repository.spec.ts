import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import User, { UserProps } from './user.entity';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let typeOrmRepository: Repository<User>;

  const mockUserProps: UserProps = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    typeOrmRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = new User(mockUserProps);
    jest.spyOn(typeOrmRepository, 'save').mockResolvedValue(user);

    expect(await userRepository.create(user)).toEqual(user);
    expect(typeOrmRepository.save).toHaveBeenCalledWith(user);
  });

  it('should find a user by id', async () => {
    const user = new User(mockUserProps);
    jest.spyOn(typeOrmRepository, 'findOneOrFail').mockResolvedValue(user);

    expect(await userRepository.find('1')).toEqual(user);
    expect(typeOrmRepository.findOneOrFail).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should activate a user', async () => {
    const user = new User(mockUserProps);
    jest.spyOn(typeOrmRepository, 'save').mockResolvedValue(user);

    expect(await userRepository.active(user)).toEqual(user);
    expect(typeOrmRepository.save).toHaveBeenCalledWith(user);
  });

  it('should find all users', async () => {
    const users = [new User(mockUserProps), new User(mockUserProps)];
    jest.spyOn(typeOrmRepository, 'find').mockResolvedValue(users);

    expect(await userRepository.findAll()).toEqual(users);
    expect(typeOrmRepository.find).toHaveBeenCalled();
  });

  it('should update a user', async () => {
    const user = new User(mockUserProps);
    jest.spyOn(typeOrmRepository, 'save').mockResolvedValue(user);

    expect(await userRepository.update(user)).toEqual(user);
    expect(typeOrmRepository.save).toHaveBeenCalledWith(user);
  });
});
