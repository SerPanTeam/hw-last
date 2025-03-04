import { Module } from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { MagazineController } from './magazine.controller';

@Module({
  controllers: [MagazineController],
  providers: [MagazineService],
})
export class MagazineModule {}
