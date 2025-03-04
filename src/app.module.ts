import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { PublisherModule } from './publisher/publisher.module';
import { MagazineModule } from './magazine/magazine.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // или ваш хост
      port: 5432, // порт PostgreSQL
      username: 'postgres', // ваш пользователь
      password: '36355693801', // ваш пароль
      database: 'postgres1', // ваша БД
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // на время разработки можно включить
    }),
    UsersModule,
    ArticlesModule,
    TagsModule,
    PublisherModule,
    MagazineModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
