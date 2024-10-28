import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDireccionDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  Pais: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  Estado: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  Ciudad: string;
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  Calle: string;
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  @MinLength(1)
  NumExterior: string;
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  NumInterior: string;
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  @MinLength(1)
  CodigoPostal: string;
}
