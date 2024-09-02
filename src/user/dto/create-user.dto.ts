import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(20, { message: 'Error!!! Your name very length or absent' })
  username: string;
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be more 6 symbols' })
  password: string;
}
