import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Direcciones } from './Direcciones.entity';
import { MPagos } from 'src/PaymentsModule/mpagos/entities/mpago.entity';
import { Ordenes } from 'src/PaymentsModule/ordenes/entities/ordene.entity';
import { Carrito } from 'src/StoreModule/carritos/entities/carrito.entity';

@Entity({ name: 'Usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text')
  Nombre: string;
  @Column('text')
  Apellido: string;
  @Column('text', { unique: true })
  Correo: string;
  @Column('text', { select: false })
  Password: string;
  @Column('bool')
  State: boolean;
  @OneToMany(() => Direcciones, (direcciones) => direcciones.Usuario)
  direcciones: Direcciones;
  @OneToMany(() => MPagos, (mPagos) => mPagos.Usuario)
  mPagos: MPagos;
  @OneToMany(() => Ordenes, (ordenes) => ordenes.usuario)
  ordenes: Ordenes;
  @OneToMany(() => Carrito, (carritos) => carritos.usuario)
  carritos: Carrito;
}
