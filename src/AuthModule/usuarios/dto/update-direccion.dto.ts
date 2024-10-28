import { PartialType } from '@nestjs/swagger';
import { CreateDireccionDto } from './create-direccion.dto';

export class updateDireccionDto extends PartialType(CreateDireccionDto) {}
