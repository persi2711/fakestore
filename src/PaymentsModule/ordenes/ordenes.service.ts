import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrdeneDto } from './dto/create-ordene.dto';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ordenes } from './entities/ordene.entity';
import { Repository } from 'typeorm';
import { Carrito } from 'src/StoreModule/carritos/entities/carrito.entity';
import { MPagos } from '../mpagos/entities/mpago.entity';
import { Direcciones } from 'src/AuthModule/usuarios/entities/Direcciones.entity';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Ordenes)
    private ordenesRepository: Repository<Ordenes>,
    @InjectRepository(Carrito)
    private carritoRepository: Repository<Carrito>,
    @InjectRepository(MPagos)
    private mPagosRepository: Repository<MPagos>,
    @InjectRepository(Direcciones)
    private direccionesRepository: Repository<Direcciones>,
  ) {}
  async create(createOrdeneDto: CreateOrdeneDto, user: Usuario) {
    const mpago = await this.mPagosRepository.findOne({
      where: { Id: createOrdeneDto.IdMpago },
    });
    if (!mpago) {
      throw new NotFoundException('no se encontro el metodo de pago');
    }
    const direccion = await this.direccionesRepository.findOne({
      where: { Id: createOrdeneDto.IdDireccion },
    });
    if (!direccion) {
      throw new NotFoundException('no se encotro la direccion');
    }
    const carrito = await this.carritoRepository.findOne({
      where: { usuario: user, State: true },
    });
    if (!carrito) {
      throw new NotFoundException('no se encotro el carrito');
    }
    const orden = await this.ordenesRepository.create({
      CreateDate: Date().toString(),
      usuario: user,
      carrito: carrito,
      direccion: direccion,
      mPago: mpago,
    });
    if (!orden) {
      throw new BadRequestException('no se pudo procesar la orden');
    }
    await this.ordenesRepository.save(orden);
    carrito.State = false;
    await this.carritoRepository.save(carrito);

    const newCarrito = await this.carritoRepository.create({
      Total: 0,
      CreateDate: Date().toString(),
      State: true,
      usuario: user,
    });
    if (!newCarrito) {
      throw new BadRequestException('no se pudo procesar la orden');
    }

    await this.carritoRepository.save(newCarrito);

    return 'se creo la orden';
  }

  async findAll() {
    return await this.ordenesRepository.find({
      relations: ['carrito'],
    });
  }

  async findOne(id: string) {
    return await this.ordenesRepository.findOne({
      where: { Id: id },

      relations: [
        'direccion',
        'mPago',
        'carrito',
        'carrito.carritoProducto',
        'carrito.carritoProducto.producto',
      ],
    });
  }
}
