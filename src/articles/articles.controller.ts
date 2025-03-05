import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // <-- импорт
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('Articles') // <-- Группа в Swagger
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ summary: 'Создать статью' }) // <-- краткое описание метода
  @ApiResponse({ status: 201, description: 'Статья успешно создана.' })
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @ApiOperation({ summary: 'Получить все статьи' })
  @ApiResponse({ status: 200, description: 'Возвращает массив статей.' })
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @ApiOperation({ summary: 'Получить статью по ID' })
  @ApiResponse({ status: 200, description: 'Статья найдена.' })
  @ApiResponse({ status: 404, description: 'Статья не найдена.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновить статью по ID' })
  @ApiResponse({ status: 200, description: 'Статья обновлена.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @ApiOperation({ summary: 'Удалить статью по ID' })
  @ApiResponse({ status: 200, description: 'Статья удалена.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { ArticlesService } from './articles.service';
// import { CreateArticleDto } from './dto/create-article.dto';
// import { UpdateArticleDto } from './dto/update-article.dto';

// @Controller('articles')
// export class ArticlesController {
//   constructor(private readonly articlesService: ArticlesService) {}

//   @Post()
//   create(@Body() createArticleDto: CreateArticleDto) {
//     return this.articlesService.create(createArticleDto);
//   }

//   @Get()
//   findAll() {
//     return this.articlesService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.articlesService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
//     return this.articlesService.update(+id, updateArticleDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.articlesService.remove(+id);
//   }
// }
