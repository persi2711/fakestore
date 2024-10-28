import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { updateDireccionDto } from './dto/update-direccion.dto';
import { Direcciones } from './entities/Direcciones.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    @InjectRepository(Direcciones)
    private direccionesRepository: Repository<Direcciones>,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.userRepository.create(createUsuarioDto);
    const correo = await this.userRepository.findOne({
      where: { Correo: createUsuarioDto.Correo },
    });
    if (correo) {
      throw new BadRequestException('Ya existe un usuario con ese correo');
    }
    usuario.Password = bcrypt.hashSync(usuario.Password, 10);
    usuario.State = true;
    await this.userRepository.save(usuario);
    return 'Se creo el usuario con exito';
  }

  async update(Id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.userRepository.findOne({ where: { Id } });
    if (!usuario) {
      throw new NotFoundException('El usuario No existe');
    }
    if (updateUsuarioDto.Correo && updateUsuarioDto.Correo !== usuario.Correo) {
      const correo = await this.userRepository.findOne({
        where: { Correo: updateUsuarioDto.Correo },
      });
      if (correo) {
        throw new BadRequestException('El correo ya existe');
      }
    }
    await this.userRepository.merge(usuario, updateUsuarioDto);
    if (updateUsuarioDto.Password) {
      usuario.Password = bcrypt.hashSync(usuario.Password, 10);
    }

    await this.userRepository.save(usuario);
    return 'Actualizado con exito';
  }

  async CreateDirec(createDrieccionDto: CreateDireccionDto, user: Usuario) {
    const direccion =
      await this.direccionesRepository.create(createDrieccionDto);
    direccion.Usuario = user;
    await this.direccionesRepository.save(direccion);
    return 'se creo la direccion';
  }

  async updateDirec(id: string, updateDireccionDto: updateDireccionDto) {
    const direccion = await this.direccionesRepository.findOne({
      where: { Id: id },
    });
    if (!direccion) {
      throw new NotFoundException('no se encontro la dieccion');
    }
    await this.direccionesRepository.merge(direccion, updateDireccionDto);
    await this.direccionesRepository.save(direccion);
    return 'se actualizo la direccion';
  }
  async GetDirec(user: Usuario) {
    return await this.direccionesRepository.find({ where: { Usuario: user } });
  }
  async deleteDirec(id: string) {
    const direccion = await this.direccionesRepository.findOne({
      where: { Id: id },
    });
    if (!direccion) {
      throw new NotFoundException('no se encontro la dieccion');
    }
    await this.direccionesRepository.delete(direccion);
  }
}
