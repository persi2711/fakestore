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
import { MpagosService } from './mpagos.service';
import { CreateMpagoDto } from './dto/create-mpago.dto';
import { UpdateMpagoDto } from './dto/update-mpago.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/AuthModule/auth/Decorators/get-user.decorator';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Mpagos')
@ApiBearerAuth()
@Controller('mpagos')
export class MpagosController {
  constructor(private readonly mpagosService: MpagosService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createMpagoDto: CreateMpagoDto, @GetUser() user: Usuario) {
    return this.mpagosService.create(createMpagoDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: Usuario) {
    return this.mpagosService.findAll(user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateMpagoDto: UpdateMpagoDto) {
    return this.mpagosService.update(id, updateMpagoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.mpagosService.remove(id);
  }
}
