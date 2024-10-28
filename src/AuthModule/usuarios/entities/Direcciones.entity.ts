import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Ordenes } from 'src/PaymentsModule/ordenes/entities/ordene.entity';

@Entity({ name: 'Derecciones' })
export class Direcciones {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text')
  Pais: string;
  @Column('text')
  Estado: string;
  @Column('text')
  Ciudad: string;
  @Column('text')
  Calle: string;
  @Column('text')
  NumExterior;
  @Column('text', { nullable: true })
  NumInterior;
  @Column('text')
  CodigoPostal;
  @ManyToOne(() => Usuario, (usuario) => usuario.direcciones)
  @JoinColumn()
  Usuario: Usuario;
  @OneToMany(() => Ordenes, (orden) => orden.direccion)
  orden: Ordenes;
}
