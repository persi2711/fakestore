import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ordenes } from './entities/ordene.entity';
import { Carrito } from 'src/StoreModule/carritos/entities/carrito.entity';
import { MPagos } from '../mpagos/entities/mpago.entity';
import { Direcciones } from 'src/AuthModule/usuarios/entities/Direcciones.entity';
import { AuthModule } from 'src/AuthModule/auth/auth.module';

@Module({
  controllers: [OrdenesController],
  providers: [OrdenesService],
  imports: [
    TypeOrmModule.forFeature([Ordenes, Carrito, MPagos, Direcciones]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class OrdenesModule {}
