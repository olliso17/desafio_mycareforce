import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Redis } from "ioredis";
import { url } from "inspector";

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

  // const redis = new Redis(process.env.REDIS_URL);
  
  // redis.on('connect', () => {
  //   console.log('Connected to Redis');
  // });
  
  // redis.on('error', (err) => {
  //   console.error('Redis connection error:', err);
  // });
  await app.listen(3000);
}

bootstrap();
