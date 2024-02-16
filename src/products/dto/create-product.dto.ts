import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 128)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  price: number;
}

//adicionar  cor ???
