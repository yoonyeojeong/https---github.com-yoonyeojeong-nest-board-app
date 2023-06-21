import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/signin.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto) {
    const {
      USERNAME,
      PASSWORD,
      EMAIL,
      NICKNAME,
      BOARD_NICKNAME,
      INTRODUCE,
      GENDER,
      CALLNUM,
      IMAGE,
      GOOGLE,
      APPLE,
      ISLOGIN,
      STATE,
      REGION,
      LANGUAGE,
      BIRTHDAY,
    } = authCredentialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(PASSWORD, salt);
    try {
      const USER = await this.knex.table('USER').insert({
        USERNAME,
        PASSWORD: hashedPassword,
        EMAIL,
        NICKNAME,
        BOARD_NICKNAME,
        INTRODUCE,
        GENDER,
        CALLNUM,
        IMAGE,
        GOOGLE,
        APPLE,
        ISLOGIN,
        STATE,
        REGION,
        LANGUAGE,
        BIRTHDAY,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // async signIn(loginDto: LoginDto): Promise<{ accessToken: string }> {
  //   const { EMAIL, PASSWORD } = loginDto;
  //   const USER = await this.userRepository.findOne({ where: { EMAIL } });

  //   if (USER && (await bcrypt.compare(PASSWORD, USER.PASSWORD))) {
  //     // 중요한 정보는 넣으면 안 됨
  //     const payload = { EMAIL };
  //     const accessToken = await this.jwtService.sign(payload);

  //     return { accessToken };
  //   } else {
  //     throw new UnauthorizedException('login failed');
  //   }
  // }

  async signIn(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { EMAIL, PASSWORD } = loginDto;
    if (!EMAIL) {
      throw new NotFoundException(`${EMAIL} is not registerd e-mail`);
    }

    const USER: { EMAIL: string; PASSWORD: string } = await this.knex('USER')
      .where('EMAIL', EMAIL)
      .first();
    if (USER && (await bcrypt.compare(PASSWORD, USER.PASSWORD))) {
      const payload = { EMAIL };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
