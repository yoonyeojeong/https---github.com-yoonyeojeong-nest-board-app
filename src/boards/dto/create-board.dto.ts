import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  TITLE: string;

  @IsNotEmpty()
  DESCRIPTION: string;
}
