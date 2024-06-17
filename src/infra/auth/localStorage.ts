import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUsecase } from '../../usecases/login/login.usecase';
import { LoginInputDto } from '../login/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginUsecase: LoginUsecase) {
    super();
  }

  async validate(input:LoginInputDto): Promise<any> {
    const user = await this.loginUsecase.execute(input);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
