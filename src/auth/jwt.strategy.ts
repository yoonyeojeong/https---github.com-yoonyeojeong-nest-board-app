import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // @InjectRepository(UserRepository)
    // private userRepository: UserRepository,
    @InjectConnection() private readonly knex: Knex,
  ) {
    super({
      secretOrKey: 'news9test',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // async validate(payload) {
  //   const { EMAIL } = payload;
  //   const USER: User = await this.userRepository.findOne({
  //     where: { EMAIL },
  //   });

  //   if (!USER) {
  //     throw new UnauthorizedException();
  //   }

  //   return USER;
  // }

  async validate(payload) {
    const { EMAIL } = payload;
    const USER = await this.knex.table('USER').where('EMAIL', EMAIL).first();

    if (!USER) {
      throw new UnauthorizedException();
    }

    return USER;
  }
}
