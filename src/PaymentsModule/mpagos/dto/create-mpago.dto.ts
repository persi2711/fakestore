import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinDate,
  MinLength,
  Validate,
} from 'class-validator';
import { CustomDateFormatValidator } from 'src/PaymentsModule/Validators/ValidatorsPayments';

export class CreateMpagoDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  NombrePropietario: string;
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  ApellidoPropietario: string;
  @ApiProperty()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  NumeroTarjeta: string;
  @ApiProperty()
  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: 'La fecha debe estar en el formato MM/YY con un mes válido (1-12)',
  })
  @Validate(CustomDateFormatValidator, {
    message:
      'El año debe estar entre el año actual y hasta 10 años en el futuro',
  })
  FechaCad: string;
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  CVV: string;
}
