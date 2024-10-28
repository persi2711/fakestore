import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Direcciones } from './entities/Direcciones.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { DireccionesController } from './direcciones.controller';

@Module({
  controllers: [UsuariosController, DireccionesController],
  providers: [UsuariosService],
  imports: [
    TypeOrmModule.forFeature([Usuario, Direcciones]),
    JwtModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class UsuariosModule {}
