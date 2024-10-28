import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './AuthModule/auth/auth.module';
import { UsuariosModule } from './AuthModule/usuarios/usuarios.module';
import { MpagosModule } from './PaymentsModule/mpagos/mpagos.module';
import { OrdenesModule } from './PaymentsModule/ordenes/ordenes.module';
import { CarritosModule } from './StoreModule/carritos/carritos.module';
import { ProductosModule } from './StoreModule/productos/productos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsuariosModule,
    MpagosModule,
    OrdenesModule,
    CarritosModule,
    ProductosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
