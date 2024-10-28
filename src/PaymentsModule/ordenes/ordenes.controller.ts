import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { CreateOrdeneDto } from './dto/create-ordene.dto';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/AuthModule/auth/Decorators/get-user.decorator';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Ordenes')
@ApiBearerAuth()
@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createOrdeneDto: CreateOrdeneDto, @GetUser() user: Usuario) {
    return this.ordenesService.create(createOrdeneDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.ordenesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.ordenesService.findOne(id);
  }
}
