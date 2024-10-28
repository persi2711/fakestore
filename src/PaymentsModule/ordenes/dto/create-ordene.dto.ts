import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateOrdeneDto {
  @ApiProperty()
  @IsUUID()
  IdDireccion: string;
  @ApiProperty()
  @IsUUID()
  IdMpago: string;
}
