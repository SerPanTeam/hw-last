import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  create(createPublisherDto: CreatePublisherDto) {
    const publischer = this.publisherRepository.create(createPublisherDto);
    return this.publisherRepository.save(publischer);
  }

  findAll() {
    return this.publisherRepository.find();
  }

  findOne(id: number) {
    return this.publisherRepository.findOne({ where: { id } });
  }

  update(id: number, updatePublisherDto: UpdatePublisherDto) {
    return this.publisherRepository.update(id, updatePublisherDto);
  }

  remove(id: number) {
    return this.publisherRepository.delete(id);
  }
}
