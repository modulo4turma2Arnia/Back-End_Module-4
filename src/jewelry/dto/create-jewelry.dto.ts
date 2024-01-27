
import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator';

export class CreateJewelryDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 32)
  type: string;

  @IsNotEmpty()
  @IsString()
  habilities: string;


}

