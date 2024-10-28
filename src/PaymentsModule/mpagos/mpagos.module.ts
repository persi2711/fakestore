import { Module } from '@nestjs/common';
import { MpagosService } from './mpagos.service';
import { MpagosController } from './mpagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MPagos } from './entities/mpago.entity';
import { AuthModule } from 'src/AuthModule/auth/auth.module';

@Module({
  controllers: [MpagosController],
  providers: [MpagosService],
  imports: [TypeOrmModule.forFeature([MPagos]), AuthModule],
  exports: [TypeOrmModule],
})
export class MpagosModule {}
