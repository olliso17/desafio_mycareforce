import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Redis } from "ioredis";
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Mycareforce challenge")
    .setDescription(
      "Challenge for the vacancy at Mycareforce",
    )
    .setVersion("1.0")
    .addTag("users")
    .addTag("login")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth",
    )
    .addTag("donations")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors();

  const RedisStore = connectRedis(session);
  const redisClient = new Redis({
    host: process.env.REDIS_HOST ,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  });

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SALT,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, 
    }),
  );
  
  await app.listen(3000);
}

bootstrap();
