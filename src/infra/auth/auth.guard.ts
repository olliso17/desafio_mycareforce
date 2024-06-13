import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CacheService } from '../../cache/cache.service';

const dotenv = require("dotenv");
dotenv.config();

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private cacheService: CacheService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        const redisToken = await this.cacheService.retrieveData(token);

        if (!token || !redisToken) {
            throw new UnauthorizedException('Token não fornecido ou não autorizado.' + redisToken);
        }

        try {
            const payload = await this.jwtService.verifyAsync(redisToken, {
                secret: process.env.SALT,
                // algorithms: ['HS256'],
            });

            request['user'] = payload;

        } catch(err) {
            throw new UnauthorizedException('Falha na verificação do token.'+err);
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}