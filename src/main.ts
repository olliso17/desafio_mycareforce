import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Redis } from "ioredis";

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
  // dotenv.config();

  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    tls: {} // TLS habilitado
  });
  
  redis.on('connect', () => {
    console.log('Connected to Redis');
  });
  
  redis.on('error', (err) => {
    console.error('Redis connection error:', err);
  });
  await app.listen(3000);
}

bootstrap();
