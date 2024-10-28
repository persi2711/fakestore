import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { Ordenes } from 'src/PaymentsModule/ordenes/entities/ordene.entity';
import { Productos } from 'src/StoreModule/productos/entities/producto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarritoProducto } from './CarritoProducto.entity';

@Entity({ name: 'Carrito' })
export class Carrito {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('decimal')
  Total: number;
  @Column('text')
  CreateDate: string;
  @Column('bool')
  State: boolean;
  @ManyToOne(() => Usuario, (usuario) => usuario.carritos)
  @JoinColumn()
  usuario: Usuario;
  @OneToOne(() => Ordenes, (orden) => orden.carrito)
  orden: Ordenes;
  @OneToMany(
    () => CarritoProducto,
    (carritoProducto) => carritoProducto.carrito,
  )
  carritoProducto: CarritoProducto;
}
