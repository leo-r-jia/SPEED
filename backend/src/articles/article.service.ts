import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.model';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) {}

  async createArticle(articleDto: Partial<Article>): Promise<Article> {
    const newArticle = new this.articleModel(articleDto);
    return await newArticle.save();
  }

  async getAllArticles(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async findArticlesByTitle(keyword: string): Promise<Article[]> {
    return await this.articleModel.find({ title: new RegExp(keyword, 'i') }).exec();
  }
  

  // ... other CRUD methods ...
}
