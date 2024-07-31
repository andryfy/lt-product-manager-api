import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
