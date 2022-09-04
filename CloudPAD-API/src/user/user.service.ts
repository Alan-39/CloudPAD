import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

import { RegisterUserDto } from 'src/user/dto/register-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<boolean> {
    const isExist = await this.userRepository.findOne({
      where: { username: registerUserDto.username },
    });
    if (isExist) return false;

    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(registerUserDto.password, salt);
    registerUserDto.password = hash;

    return (await this.userRepository.save(registerUserDto)) ? true : false;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(whereParam: Object): Promise<User | undefined> {
    return await this.userRepository.findOne(whereParam);
  }

  async update(id: string, user: User): Promise<void> {
    await this.userRepository.update({ id: id }, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete({ id: id });
  }
}
