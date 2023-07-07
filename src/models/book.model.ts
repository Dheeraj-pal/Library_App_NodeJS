import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  creatorID: mongoose.Schema.Types.ObjectId | string;
  createdAt: Date;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, required: true },
  creatorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Book = mongoose.model<IBook>("Book", BookSchema);
