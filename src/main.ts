import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as session from 'express-session';

const redis = require("redis");
const RedisStore = require("connect-redis").default;
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

  const redisURL = process.env.REDIS_URL;
  const redisClient = new redis.createClient(redisURL);

  const sessionOptions: session.SessionOptions = {
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SALT,
    resave: false,
    saveUninitialized: false,
  };
  
  app.use(session(sessionOptions));

  await app.listen(3000);
}

bootstrap();
