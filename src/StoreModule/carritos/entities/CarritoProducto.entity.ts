import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carrito } from './carrito.entity';
import { Productos } from 'src/StoreModule/productos/entities/producto.entity';

@Entity({ name: 'CarritoProducto' })
export class CarritoProducto {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('int')
  Cantidad;

  @ManyToOne(() => Carrito, (carrito) => carrito.carritoProducto)
  @JoinColumn()
  carrito: Carrito;

  @ManyToOne(() => Productos, (producto) => producto.carritoProducto)
  @JoinColumn()
  producto: Productos;
}
