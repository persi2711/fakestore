import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CarritosService } from './carritos.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { GetUser } from 'src/AuthModule/auth/Decorators/get-user.decorator';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Carritos')
@ApiBearerAuth()
@Controller('carritos')
export class CarritosController {
  constructor(private readonly carritosService: CarritosService) {}

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.carritosService.findOne(id);
  }
  @Get()
  @UseGuards(AuthGuard())
  ActiveCar(@GetUser() user: Usuario) {
    return this.carritosService.ActiveCar(user);
  }
  @Patch('agregar/:id')
  @UseGuards(AuthGuard())
  Agregar(@GetUser() user: Usuario, @Param('id', ParseUUIDPipe) id: string) {
    return this.carritosService.agregar(id, user);
  }
  @Patch('reducir/:id')
  @UseGuards(AuthGuard())
  reducir(@GetUser() user: Usuario, @Param('id', ParseUUIDPipe) id: string) {
    return this.carritosService.reducir(id, user);
  }
}
