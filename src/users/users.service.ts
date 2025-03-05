// users.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    // Хешируем пароль
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hash;

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async changePassword(
    userId: number,
    { currentPassword, newPassword }: ChangePasswordDto,
  ) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      throw new BadRequestException('Incorrect current password');
    }

    // Хешируем новый пароль
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);

    // Сбрасываем mustChangePassword
    user.mustChangePassword = false;
    return this.userRepository.save(user);
  }

  async deleteAccount(userId: number, password: string) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new BadRequestException('Incorrect password');
    }
    await this.userRepository.delete(userId);
    return { message: 'Account deleted' };
  }

  async changeEmail(userId: number, currentPassword: string, newEmail: string) {
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      throw new BadRequestException('Incorrect current password');
    }

    // Проверяем, не занят ли уже newEmail
    const existing = await this.userRepository.findOne({
      where: { email: newEmail },
    });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    user.email = newEmail;
    await this.userRepository.save(user);
    return { message: 'Email updated' };
  }
}
