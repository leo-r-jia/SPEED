import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './articles/article.module';
const dbConfig = require('../config/default.json');


@Module({
  imports: [
    MongooseModule.forRoot(dbConfig.mongoURI),
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
