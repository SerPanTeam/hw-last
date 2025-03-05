import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { PublisherModule } from './publisher/publisher.module';
import { MagazineModule } from './magazine/magazine.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '185.67.3.96', // или ваш хост
      port: 5432, // порт PostgreSQL
      username: 'panchenkowork_postgres1', // ваш пользователь
      password: '36355693801', // ваш пароль
      database: 'panchenkowork_postgres1', // ваша БД
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule {}
