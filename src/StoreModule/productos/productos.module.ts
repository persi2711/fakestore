import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './entities/producto.entity';
import { AuthModule } from 'src/AuthModule/auth/auth.module';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [TypeOrmModule.forFeature([Productos]), AuthModule],
  exports: [TypeOrmModule],
})
export class ProductosModule {}
