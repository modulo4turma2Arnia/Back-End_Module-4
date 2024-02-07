import { IsString, IsNotEmpty, MinLength, NotEquals } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @NotEquals('currentPassword', {
    message: 'New password must be different from the current password',
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  currentPassword: string;
  id: number;
}
