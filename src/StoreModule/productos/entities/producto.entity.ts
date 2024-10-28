import { Carrito } from 'src/StoreModule/carritos/entities/carrito.entity';
import { CarritoProducto } from 'src/StoreModule/carritos/entities/CarritoProducto.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Productos' })
export class Productos {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  title: string;
  @Column('decimal')
  price: number;
  @Column('text')
  category: string;
  @Column('text')
  description: string;
  @Column('text')
  image: string;
  @OneToMany(
    () => CarritoProducto,
    (carritoProducto) => carritoProducto.producto,
  )
  carritoProducto: CarritoProducto;
}
