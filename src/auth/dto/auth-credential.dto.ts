import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

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
}
