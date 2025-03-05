import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'My first article', description: 'Название статьи' })
  title: string;

  @ApiProperty({
    example: 'Some interesting text...',
    description: 'Тело статьи',
  })
  content: string;
}
