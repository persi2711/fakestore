import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMpagoDto } from './dto/create-mpago.dto';
import { UpdateMpagoDto } from './dto/update-mpago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MPagos } from './entities/mpago.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';

@Injectable()
export class MpagosService {
  constructor(
    @InjectRepository(MPagos)
    private mPagosRepository: Repository<MPagos>,
  ) {}
  async create(createMpagoDto: CreateMpagoDto, user: Usuario) {
    const search = await this.mPagosRepository.findOne({
      where: { NumeroTarjeta: createMpagoDto.NumeroTarjeta },
    });
    if (search) {
      throw new BadRequestException(
        'ya existe un metodo de pago con esa tarjeta',
      );
    }
    const mpago = await this.mPagosRepository.create(createMpagoDto);
    mpago.Usuario = user;
    await this.mPagosRepository.save(mpago);
    return 'Se creo el pago';
  }

  async findAll(user: Usuario) {
    return this.mPagosRepository.find({ where: { Usuario: user } });
  }

  async update(id: string, updateMpagoDto: UpdateMpagoDto) {
    const mpago = await this.mPagosRepository.findOne({ where: { Id: id } });
    if (!mpago) {
      throw new NotFoundException('no se encontro el metodo de pago');
    }
    await this.mPagosRepository.merge(mpago, updateMpagoDto);
    await this.mPagosRepository.save(mpago);
    return `se actualizo el metodo de pago`;
  }

  async remove(id: string) {
    const mpago = await this.mPagosRepository.findOne({ where: { Id: id } });
    if (!mpago) {
      throw new NotFoundException('no se encontro el metodo de pago');
    }
    await this.mPagosRepository.remove(mpago);
    return `This action removes a #${id} mpago`;
  }
}
