import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { updateDireccionDto } from './dto/update-direccion.dto';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from './entities/usuario.entity';
import { GetUser } from '../auth/Decorators/get-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Direcciones')
@ApiBearerAuth()
@Controller('direcciones')
export class DireccionesController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('')
  @UseGuards(AuthGuard())
  create(
    @Body() createDireccion: CreateDireccionDto,
    @GetUser() user: Usuario,
  ) {
    return this.usuariosService.CreateDirec(createDireccion, user);
  }
  @Get()
  @UseGuards(AuthGuard())
  Get(@GetUser() user: Usuario) {
    return this.usuariosService.GetDirec(user);
  }
  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDireccionDto: updateDireccionDto,
  ) {
    return this.usuariosService.updateDirec(id, updateDireccionDto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard())
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuariosService.deleteDirec(id);
  }
}
