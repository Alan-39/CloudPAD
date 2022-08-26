import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
import { User } from 'src/entities/user.entity';

import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async verify(user: LoginUserDto): Promise<boolean> {
    const verifyUser = await this.userRepository.findOne({
      where: { username: user.username },
    });

    return await bcrypt.compare(user.password, verifyUser.password);
  }

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

  async findOne(id: ObjectID): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: ObjectID, user: User): Promise<void> {
    await this.userRepository.update({ id: id }, user);
  }

  async delete(id: ObjectID): Promise<void> {
    await this.userRepository.delete({ id: id });
  }
}
