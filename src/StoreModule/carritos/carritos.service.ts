import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrito } from './entities/carrito.entity';
import { Repository } from 'typeorm';
import { CarritoProducto } from './entities/CarritoProducto.entity';
import { Productos } from '../productos/entities/producto.entity';

@Injectable()
export class CarritosService {
  constructor(
    @InjectRepository(Carrito)
    private carritoRepository: Repository<Carrito>,
    @InjectRepository(CarritoProducto)
    private carritoProductoRespository: Repository<CarritoProducto>,
    @InjectRepository(Productos)
    private productoRepository: Repository<Productos>,
  ) {}

  async findOne(id: string) {
    const carrito = await this.carritoRepository.findOne({
      where: { Id: id },
      relations: ['carritoProducto', 'carritoProducto.producto'],
    });
  }

  async agregar(id: string, user: Usuario) {
    const producto = await this.productoRepository.findOne({
      where: { id: id },
    });
    if (!producto) {
      throw new NotFoundException('no se encontro el producto');
    }
    const carrito = await this.carritoRepository.findOne({
      where: { usuario: user, State: true },
    });
    if (!carrito) {
      throw new NotFoundException('no se encontro un carrito');
    }
    const carritoProducto = await this.carritoProductoRespository.findOne({
      where: { producto: producto, carrito: carrito },
    });
    if (!carritoProducto) {
      const newCarritoProducto = await this.carritoProductoRespository.create({
        Cantidad: 1,
        producto: producto,
        carrito: carrito,
      });
      carrito.Total = parseFloat(
        (Number(carrito.Total) + Number(producto.price)).toFixed(2),
      );
      await this.carritoProductoRespository.save(newCarritoProducto);
    } else {
      carritoProducto.Cantidad = carritoProducto.Cantidad + 1;
      carrito.Total = parseFloat(
        (Number(carrito.Total) + Number(producto.price)).toFixed(2),
      );
      await this.carritoProductoRespository.save(carritoProducto);
    }
    await this.carritoRepository.save(carrito);
    return 'se agrego el producto al carrito';
  }
  async reducir(id: string, user: Usuario) {
    const producto = await this.productoRepository.findOne({
      where: { id: id },
    });
    if (!producto) {
      throw new NotFoundException('no se encontro el producto');
    }
    const carrito = await this.carritoRepository.findOne({
      where: { usuario: user, State: true },
    });
    if (!carrito) {
      throw new NotFoundException('no se encontro un carrito');
    }
    const carritoProducto = await this.carritoProductoRespository.findOne({
      where: { producto: producto, carrito: carrito },
    });
    if (carritoProducto) {
      if (carritoProducto.Cantidad === 1) {
        carrito.Total = parseFloat(
          (Number(carrito.Total) - Number(producto.price)).toFixed(2),
        );

        await this.carritoProductoRespository.remove(carritoProducto);
      } else {
        carritoProducto.Cantidad = carritoProducto.Cantidad - 1;
        carrito.Total = parseFloat(
          (Number(carrito.Total) - Number(producto.price)).toFixed(2),
        );
        this.carritoProductoRespository.save(carritoProducto);
      }
    } else {
      throw new BadRequestException('no existe el elemento en el carrito');
    }
    await this.carritoRepository.save(carrito);
    return 'se redujo el elemento';
  }
  async ActiveCar(user: Usuario) {
    const carrito = await this.carritoRepository.findOne({
      where: { usuario: user, State: true },
      relations: ['carritoProducto', 'carritoProducto.producto'],
    });
    if (!carrito) {
      throw new NotFoundException('no se encotro el carrito');
    }
    return carrito;
  }
}
