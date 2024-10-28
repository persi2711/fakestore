import { Direcciones } from 'src/AuthModule/usuarios/entities/Direcciones.entity';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { MPagos } from 'src/PaymentsModule/mpagos/entities/mpago.entity';
import { Carrito } from 'src/StoreModule/carritos/entities/carrito.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Ordenes' })
export class Ordenes {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text')
  CreateDate: string;
  @ManyToOne(() => Usuario, (usuario) => usuario.ordenes)
  @JoinColumn()
  usuario: Usuario;
  @OneToOne(() => Carrito, (carrito) => carrito.orden)
  @JoinColumn()
  carrito: Carrito;
  @ManyToOne(() => Direcciones, (direccion) => direccion.orden)
  @JoinColumn()
  direccion: Direcciones;
  @ManyToOne(() => MPagos, (mPago) => mPago.orden)
  mPago: MPagos;
}
