import { IsString, IsNotEmpty, NotEquals } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @NotEquals('currentPassword', {
    message: 'New password must be different from the current password',
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  currentPassword: string;
}
