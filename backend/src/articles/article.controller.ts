import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.model';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async createArticle(@Body() articleDto: Partial<Article>): Promise<Article> {
    return this.articleService.createArticle(articleDto);
  }

  @Get()
  async getAllArticles() {
    return await this.articleService.getAllArticles();
  }

  @Get('search')
  async findArticlesByTitle(@Query('keyword') keyword: string) {
    return await this.articleService.findArticlesByTitle(keyword);
  }

}
