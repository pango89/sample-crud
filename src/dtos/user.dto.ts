import { User } from '../entities/user.entity';
import { getHash } from '../utils/crypto.util';

import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  public id: number;
  public firstName: string;
  public email: string;
  public phoneNumber: string;

  public static fromEntity(user: User): UserDto {
    const userDto = new UserDto();

    userDto.id = user.id;
    userDto.firstName = user.firstName;
    userDto.email = user.email;
    userDto.phoneNumber = user.phoneNumber;

    return userDto;
  }
}

export class UserAddDto {
  @IsString()
  @IsNotEmpty()
  @Type()
  public firstName: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  @Matches(new RegExp(`(?=.*[A-Z])`), {
    message: 'At least one Uppercase letter is mandatory',
  })
  @Matches(new RegExp(`(?=.*[a-z])`), {
    message: 'At least one lowercase letter is mandatory',
  })
  @Matches(new RegExp(`(?=.*[0-9])`), {
    message: 'At least one digit is mandatory',
  })
  public password: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 10)
  public phoneNumber: string;

  public toEntity(): User {
    const user = new User();

    user.firstName = this.firstName;
    user.email = this.email;
    user.passwordHash = getHash(this.password);
    user.phoneNumber = this.phoneNumber;

    return user;
  }
}
