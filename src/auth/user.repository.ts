import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
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
    const USER = this.create({
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

    try {
      await this.save(USER);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing e-mail');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
