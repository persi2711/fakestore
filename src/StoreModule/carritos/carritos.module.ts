import { Module } from '@nestjs/common';
import { CarritosService } from './carritos.service';
import { CarritosController } from './carritos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from './entities/carrito.entity';
import { CarritoProducto } from './entities/CarritoProducto.entity';
import { AuthModule } from 'src/AuthModule/auth/auth.module';
import { Productos } from '../productos/entities/producto.entity';

@Module({
  controllers: [CarritosController],
  providers: [CarritosService],
  imports: [
    TypeOrmModule.forFeature([Carrito, CarritoProducto, Productos]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class CarritosModule {}
