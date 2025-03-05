# Структура проекта

```plaintext
├── src
│   ├── articles
│   │   ├── dto
│   │   │   ├── create-article.dto.ts
│   │   │   └── update-article.dto.ts
│   │   ├── entities
│   │   │   └── article.entity.ts
│   │   ├── articles.controller.spec.ts
│   │   ├── articles.controller.ts
│   │   ├── articles.module.ts
│   │   ├── articles.service.spec.ts
│   │   └── articles.service.ts
│   ├── common
│   │   ├── decorators
│   │   │   └── roles.decorator.ts
│   │   └── guards
│   │       └── roles.guard.ts
│   ├── magazine
│   │   ├── dto
│   │   │   ├── create-magazine.dto.ts
│   │   │   └── update-magazine.dto.ts
│   │   ├── entities
│   │   │   └── magazine.entity.ts
│   │   ├── magazine.controller.spec.ts
│   │   ├── magazine.controller.ts
│   │   ├── magazine.module.ts
│   │   ├── magazine.service.spec.ts
│   │   └── magazine.service.ts
│   ├── publisher
│   │   ├── dto
│   │   │   ├── create-publisher.dto.ts
│   │   │   └── update-publisher.dto.ts
│   │   ├── entities
│   │   │   └── publisher.entity.ts
│   │   ├── publisher.controller.spec.ts
│   │   ├── publisher.controller.ts
│   │   ├── publisher.module.ts
│   │   ├── publisher.service.spec.ts
│   │   └── publisher.service.ts
│   ├── tags
│   │   ├── dto
│   │   │   ├── create-tag.dto.ts
│   │   │   └── update-tag.dto.ts
│   │   ├── entities
│   │   │   └── tag.entity.ts
│   │   ├── tags.controller.spec.ts
│   │   ├── tags.controller.ts
│   │   ├── tags.module.ts
│   │   ├── tags.service.spec.ts
│   │   └── tags.service.ts
│   ├── users
│   │   ├── dto
│   │   │   ├── change-email.dto.ts
│   │   │   ├── change-password.dto.ts
│   │   │   ├── create-user.dto.ts
│   │   │   ├── delete-account.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── entities
│   │   │   └── user.entity.ts
│   │   ├── users.controller.spec.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.spec.ts
│   │   └── users.service.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── ___editorconfig
├── .gitignore
├── .prettierrc
├── codewr.js
├── combined-files.md
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
├── requests.http
├── tsconfig.build.json
└── tsconfig.json

```

# Файлы .ts, .tsx, .css

## src\app.controller.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

```

## src\app.controller.ts

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

```

## src\app.module.ts

```typescript
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule {}

```

## src\app.service.ts

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

```

## src\articles\articles.controller.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

describe('ArticlesController', () => {
  let controller: ArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [ArticlesService],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

```

## src\articles\articles.controller.ts

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}

```

## src\articles\articles.module.ts

```typescript
import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}

```

## src\articles\articles.service.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesService],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

```

## src\articles\articles.service.ts

```typescript
import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  findAll() {
    // return `This action returns all articles`;
    return this.articleRepository.find();
  }

  findOne(id: number) {
    return this.articleRepository.findOne({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(id, updateArticleDto);
  }

  remove(id: number) {
    return this.articleRepository.delete(id);
  }
}

```

## src\articles\dto\create-article.dto.ts

```typescript
export class CreateArticleDto {}

```

## src\articles\dto\update-article.dto.ts

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

```

## src\articles\entities\article.entity.ts

```typescript
import { Tag } from 'src/tags/entities/tag.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @ManyToMany(() => Tag, (tag) => tag.articles, {
    cascade: true,
  })
  @JoinTable()
  tags: Tag[];
}

```

## src\common\decorators\roles.decorator.ts

```typescript
import { SetMetadata } from '@nestjs/common';

/**
 * Ключ метаданных, в которые мы будем записывать список разрешённых ролей.
 */
export const ROLES_KEY = 'roles';

/**
 * Декоратор @Roles('admin', 'superadmin', ...)
 * позволяет указать, какие роли имеют доступ к этому маршруту.
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

```

## src\common\guards\roles.guard.ts

```typescript
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Получаем список ролей, записанный декоратором @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Если у метода/класса нет декоратора @Roles, значит доступ открыт
    if (!requiredRoles) {
      return true;
    }

    // Получаем request и текущего пользователя
    const request = context.switchToHttp().getRequest();
    const user = request.user; // обычно задаётся AuthGuard-ом (JWT и т.п.)

    // Если пользователя нет или у него нет нужной роли — ошибка
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied (insufficient role)');
    }

    return true; // всё хорошо, пропускаем дальше
  }
}

```

## src\magazine\dto\create-magazine.dto.ts

```typescript
export class CreateMagazineDto {}

```

## src\magazine\dto\update-magazine.dto.ts

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateMagazineDto } from './create-magazine.dto';

export class UpdateMagazineDto extends PartialType(CreateMagazineDto) {}

```

## src\magazine\entities\magazine.entity.ts

```typescript
// magazine.entity.ts
import { Publisher } from '../../publisher/entities/publisher.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Magazine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  issueNumber: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.magazines)
  publisher: Publisher;
}

```

## src\magazine\magazine.controller.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MagazineController } from './magazine.controller';
import { MagazineService } from './magazine.service';

describe('MagazineController', () => {
  let controller: MagazineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagazineController],
      providers: [MagazineService],
    }).compile();

    controller = module.get<MagazineController>(MagazineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

```

## src\magazine\magazine.controller.ts

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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
  update(
    @Param('id') id: string,
    @Body() updateMagazineDto: UpdateMagazineDto,
  ) {
    return this.magazineService.update(+id, updateMagazineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.magazineService.remove(+id);
  }
}

```

## src\magazine\magazine.module.ts

```typescript
import { Module } from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { MagazineController } from './magazine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Magazine } from './entities/magazine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Magazine])],
  controllers: [MagazineController],
  providers: [MagazineService],
})
export class MagazineModule {}

```

## src\magazine\magazine.service.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MagazineService } from './magazine.service';

describe('MagazineService', () => {
  let service: MagazineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MagazineService],
    }).compile();

    service = module.get<MagazineService>(MagazineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

```

## src\magazine\magazine.service.ts

```typescript
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

```

## src\main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Создаём конфигурацию для Swagger
  const config = new DocumentBuilder()
    .setTitle('The latest Node homework')
    .setDescription('API Documentation for The latest Node homework')
    .setVersion('1.0')
    // .addBearerAuth() // если будете подключать JWT
    .build();

  // Генерируем swagger-документ
  const document = SwaggerModule.createDocument(app, config);

  // Подключаем Swagger UI по пути /api
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();

```

## src\publisher\dto\create-publisher.dto.ts

```typescript
export class CreatePublisherDto {}

```

## src\publisher\dto\update-publisher.dto.ts

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreatePublisherDto } from './create-publisher.dto';

export class UpdatePublisherDto extends PartialType(CreatePublisherDto) {}

```

## src\publisher\entities\publisher.entity.ts

```typescript
// publisher.entity.ts
import { Magazine } from '../../magazine/entities/magazine.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => Magazine, (magazine) => magazine.publisher)
  magazines: Magazine[];
}

```

## src\publisher\publisher.controller.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';

describe('PublisherController', () => {
  let controller: PublisherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublisherController],
      providers: [PublisherService],
    }).compile();

    controller = module.get<PublisherController>(PublisherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

```

## src\publisher\publisher.controller.ts

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publisherService.create(createPublisherDto);
  }

  @Get()
  findAll() {
    return this.publisherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publisherService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ) {
    return this.publisherService.update(+id, updatePublisherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publisherService.remove(+id);
  }
}

```

## src\publisher\publisher.module.ts

```typescript
import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  controllers: [PublisherController],
  providers: [PublisherService],
})
export class PublisherModule {}

```

## src\publisher\publisher.service.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { PublisherService } from './publisher.service';

describe('PublisherService', () => {
  let service: PublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublisherService],
    }).compile();

    service = module.get<PublisherService>(PublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

```

## src\publisher\publisher.service.ts

```typescript
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

```

## src\tags\dto\create-tag.dto.ts

```typescript
export class CreateTagDto {}

```

## src\tags\dto\update-tag.dto.ts

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {}

```

## src\tags\entities\tag.entity.ts

```typescript
import { Article } from 'src/articles/entities/article.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}

```

## src\tags\tags.controller.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

describe('TagsController', () => {
  let controller: TagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [TagsService],
    }).compile();

    controller = module.get<TagsController>(TagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

```

## src\tags\tags.controller.ts

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}

```

## src\tags\tags.module.ts

```typescript
import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}

```

## src\tags\tags.service.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

```

## src\tags\tags.service.ts

```typescript
import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  findAll() {
    return this.tagRepository.find();
  }

  findOne(id: number) {
    return this.tagRepository.findOne({ where: { id } });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.tagRepository.update(id, updateTagDto);
  }

  remove(id: number) {
    return this.tagRepository.delete(id);
  }
}

```

## src\users\dto\change-email.dto.ts

```typescript
import { IsEmail, IsString } from 'class-validator';

export class ChangeEmailDto {
  @IsString()
  currentPassword: string;

  @IsEmail()
  newEmail: string;
}

```

## src\users\dto\change-password.dto.ts

```typescript
import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  newPassword: string;
}

```

## src\users\dto\create-user.dto.ts

```typescript
import { IsEmail, IsString, IsOptional } from 'class-validator';


export class CreateUserDto {
  @IsEmail()

  email: string;
  @IsString()

  password: string;
  @IsOptional()

  mustChangePassword?: boolean;
  @IsOptional()

  role?: string;
}

```

## src\users\dto\delete-account.dto.ts

```typescript
import { IsString } from 'class-validator';

export class DeleteAccountDto {
  @IsString()
  password: string;
}

```

## src\users\dto\update-user.dto.ts

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

```

## src\users\entities\user.entity.ts

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  mustChangePassword: boolean;

  @Column({ default: 'user' })
  role: string;
}

```

## src\users\users.controller.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

```

## src\users\users.controller.ts

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { ChangeEmailDto } from './dto/change-email.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('change-password')
  async changePassword(@Body() body: ChangePasswordDto, @Req() req) {
    // req.user.id должен существовать, если у вас есть AuthGuard
    // но если нет JWT, можно временно передавать id в теле,
    // это менее безопасно
    const userId = req.user.id;
    return this.usersService.changePassword(userId, body);
  }

  @Delete('delete-account')
  async deleteAccount(@Body() { password }: DeleteAccountDto, @Req() req) {
    const userId = req.user.id; // при условии, что есть авторизация
    return this.usersService.deleteAccount(userId, password);
  }

  @Patch('change-email')
  async changeEmail(
    @Body() { currentPassword, newEmail }: ChangeEmailDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.usersService.changeEmail(userId, currentPassword, newEmail);
  }
}

```

## src\users\users.module.ts

```typescript
// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // если понадобится в других местах
})
export class UsersModule {}

```

## src\users\users.service.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

```

## src\users\users.service.ts

```typescript
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

```

## test\app.e2e-spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

```

# Дополнительные файлы

⚠️ Файл **index.html** не найден и пропущен.

