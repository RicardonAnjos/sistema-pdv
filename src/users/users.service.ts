import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const user = await this.userRepository.save({
      name,
      email,
      password,
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, email, password } = updateUserDto;

    const userToUpdate = await this.userRepository.findOne({
      where: { id },
    });

    userToUpdate.name = name;
    userToUpdate.email = email;
    userToUpdate.password = password;

    const updatedUser = await this.userRepository.save(userToUpdate);
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const userToRemove = await this.userRepository.findOne({
      where: { id },
    });

    await this.userRepository.remove(userToRemove);
  }
}
