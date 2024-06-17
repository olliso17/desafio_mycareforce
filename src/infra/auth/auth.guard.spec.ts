import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '../cache/cache.service';
import { Cache } from 'cache-manager';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let jwtService: JwtService;
    let reflector: Reflector;
    let cacheService: CacheService;
    let cacheManager: Cache

    beforeEach(() => {
        jwtService = new JwtService({ secret: 'test' });
        reflector = new Reflector();
        cacheService = new CacheService(cacheManager);
        authGuard = new AuthGuard(jwtService, reflector, cacheService);
    });

    it('should return true if the route is public', async () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
        const context = {
            switchToHttp: () => ({
                getRequest: () => ({ headers: {} }),
            }),
            getHandler: jest.fn(),
            getClass: jest.fn(),
        } as unknown as ExecutionContext;

        expect(await authGuard.canActivate(context)).toBe(true);
    });

    it('should throw an UnauthorizedException if no token is provided', async () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
        jest.spyOn(cacheService, 'retrieveData').mockResolvedValue(null);
        const context = {
            switchToHttp: () => ({
                getRequest: () => ({ headers: {} }),
            }),
            getHandler: jest.fn(),
            getClass: jest.fn(),
        } as unknown as ExecutionContext;

        await expect(authGuard.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw an UnauthorizedException if the token is invalid', async () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
        jest.spyOn(cacheService, 'retrieveData').mockResolvedValue('invalidToken');
        jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error('Invalid token'));
        const context = {
            switchToHttp: () => ({
                getRequest: () => ({ headers: { authorization: 'Bearer invalidToken' } }),
            }),
            getHandler: jest.fn(),
            getClass: jest.fn(),
        } as unknown as ExecutionContext;

        await expect(authGuard.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });

    it('should return true if the token is valid', async () => {
        const validPayload = { userId: '1' };
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
        jest.spyOn(cacheService, 'retrieveData').mockResolvedValue('validToken');
        jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(validPayload);
        const context = {
            switchToHttp: () => ({
                getRequest: () => ({ headers: { authorization: 'Bearer validToken' } }),
            }),
            getHandler: jest.fn(),
            getClass: jest.fn(),
        } as unknown as ExecutionContext;

        const result = await authGuard.canActivate(context);
        expect(result).toBe(true);
    });
});
