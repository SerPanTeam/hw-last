import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';

@Controller('magazine')
export class MagazineController {
  constructor(private readonly magazineService: MagazineService) {}

  @Post()
  create(@Body() createMagazineDto: CreateMagazineDto) {
    return this.magazineService.create(createMagazineDto);
  }

  @Get()
  findAll() {
    return this.magazineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.magazineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMagazineDto: UpdateMagazineDto) {
    return this.magazineService.update(+id, updateMagazineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.magazineService.remove(+id);
  }
}
