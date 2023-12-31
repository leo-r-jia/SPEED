import { Schema, Document, model } from 'mongoose';

export interface Article extends Document {
  title: string;
  authors: string[];
  source: string;
  publication_year: number;
  doi: string;
  summary: string;
  linked_discussion: string;
  submission_date : Date;
  ratings: number[];  // Array of individual ratings
  averageRating: number; // Average of all ratings
  totalRatings: number;  // Total number of ratings given
  moderatorApproved: boolean;
  analystApproved: boolean;
  rejected: boolean;
  SE_practice: string;
  claim: string;
  evidence: string;
}

export const ArticleSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: [String] },
  source: { type: String, required: true },
  publication_year: { type: Number, required: true },
  doi: { type: String },
  summary: { type: String, default: null },
  linked_discussion: { type: String },
  submission_date: { type: Date, default: Date.now },
  ratings: [Number], 
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  moderatorApproved: { type: Boolean, default: false }, 
  analystApproved: { type: Boolean, default: false},
  rejected: { type: Boolean, default: false }, 
  SE_practice: { type: String },
  claim: { type: String },
  evidence: { type: String }
});

export const ArticleModel = model<Article>('Article', ArticleSchema);
