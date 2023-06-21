import {
  IsBoolean,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  USERNAME: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accept english and number',
  })
  PASSWORD: string;

  @IsString()
  EMAIL: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'Nickname only accept english and number',
  })
  NICKNAME: string;

  @IsString()
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'Boardname only accept english and number',
  })
  BOARD_NICKNAME: string;

  @IsString()
  @MaxLength(100)
  INTRODUCE: string;

  @IsBoolean()
  GENDER: boolean;

  @IsString()
  @Matches(/^[0-9]*$/, {
    message: 'Mobile phone numbers consist of numbers only',
  })
  CALLNUM: string;

  @IsString()
  IMAGE: string;

  @IsString()
  GOOGLE: string;

  @IsString()
  APPLE: string;

  @IsBoolean()
  ISLOGIN: boolean;

  @IsNumber()
  STATE: number;

  @IsString()
  REGION: string;

  @IsString()
  LANGUAGE: string;

  @IsString()
  BIRTHDAY: string;
}
