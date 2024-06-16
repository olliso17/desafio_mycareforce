import Redis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

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
