import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { Ordenes } from 'src/PaymentsModule/ordenes/entities/ordene.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'MPagos' })
export class MPagos {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text')
  NombrePropietario: string;
  @Column('text')
  ApellidoPropietario: string;
  @Column('text')
  NumeroTarjeta: string;
  @Column('text')
  FechaCad: string;
  @Column('text', { select: false })
  CVV: string;
  @ManyToOne(() => Usuario, (usuario) => usuario.mPagos)
  @JoinColumn()
  Usuario: Usuario;
  @OneToMany(() => Ordenes, (orden) => orden.mPago)
  orden: Ordenes;
}
