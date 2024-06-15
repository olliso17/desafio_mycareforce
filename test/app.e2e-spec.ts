import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserInputDto } from '../src/infra/user/dto/create.user.dto';
import { JwtService } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/user/create (POST)', async () => {
    
    const createUserDto: CreateUserInputDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send(createUserDto)
      .expect(HttpStatus.CREATED); 

    expect(response.body).toHaveProperty('message', 'created successfully');
    expect(response.body).toHaveProperty('token'); 
    expect(response.body).toHaveProperty('id');
  });

  it('/user/:id (GET)', async () => {
    let jwtService: JwtService;
    const userId = '123'; 
    const payload = { userId }; 
    const token = jwtService.sign(payload); 

    const response = await request(app.getHttpServer())
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK); 

    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(userId);
    
  });
  it('/auth/login (POST)', async () => {
    const loginInput = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginInput)
      .expect(HttpStatus.OK); 

    expect(response.body).toBeDefined(); 
    expect(response.body.token).toBeTruthy(); 
  });
});
