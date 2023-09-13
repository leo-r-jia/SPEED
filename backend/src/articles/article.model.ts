import { Schema, Document, model } from 'mongoose';

export interface Article extends Document {
  title: string;
  authors: string[];
  source: string;
  publication_year: number;
  doi: string;
  summary: string;
  linked_discussion: string;
  updated_date: Date;
}

export const ArticleSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: [String] },
  source: { type: String, required: true },
  publication_year: { type: Number, required: true },
  doi: { type: String },
  summary: { type: String },
  linked_discussion: { type: String },
  updated_date: { type: Date, default: Date.now }
});

export const ArticleModel = model<Article>('Article', ArticleSchema);
