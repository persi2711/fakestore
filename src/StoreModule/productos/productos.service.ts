import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Productos } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { GetProductoDto } from './dto/get-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private productosRepository: Repository<Productos>,
  ) {}
  async findAll(getProductoDto: GetProductoDto) {
    const { limit = 8, pages = 0, name, category } = getProductoDto;

    const query = this.productosRepository.createQueryBuilder('Productos');

    // Aplica el filtro de nombre solo si se proporciona
    if (name) {
      query.andWhere('LOWER(Productos.title) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    // Aplica el filtro de categoría solo si se proporciona
    if (category) {
      query.andWhere('LOWER(Productos.category) = LOWER(:category)', {
        category,
      });
    }

    // Realiza una copia de la consulta para contar el total de elementos
    const total = await query.getCount();

    // Aplica paginación en la consulta original
    const resultados = await query
      .skip(pages * limit) // Salta las primeras "pages * limit" entradas
      .take(limit) // Trae las siguientes "limit" entradas
      .getMany();
    const TotalPages = Math.floor((await total) / limit);
    return { total, TotalPages, resultados };
  }

  async findOne(id: string) {
    return await this.productosRepository.findOne({ where: { id: id } });
  }
}
