import { Schema } from 'mongoose';
import * as mongoose from "mongoose";

export const EntrySchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  body: String,
  image: String,
  created_at: Date,
});
