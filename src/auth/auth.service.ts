import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { USERNAME, PASSWORD } = authCredentialDto;
    const USER = await this.userRepository.findOne({ where: { USERNAME } });

    if (USER && (await bcrypt.compare(PASSWORD, USER.PASSWORD))) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
