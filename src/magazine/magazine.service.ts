import { Injectable } from '@nestjs/common';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Magazine } from './entities/magazine.entity';

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(Magazine)
    private readonly magazinRepository: Repository<Magazine>,
  ) {}

  create(createMagazineDto: CreateMagazineDto) {
    const publischer = this.magazinRepository.create(createMagazineDto);
    return this.magazinRepository.save(publischer);
  }

  findAll() {
    return this.magazinRepository.find();
  }

  findOne(id: number) {
    return this.magazinRepository.findOne({ where: { id } });
  }

  update(id: number, updateMagazineDto: UpdateMagazineDto) {
    return this.magazinRepository.update(id, updateMagazineDto);
  }

  remove(id: number) {
    return this.magazinRepository.delete(id);
  }
}
