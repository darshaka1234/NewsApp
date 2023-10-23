import { model, Schema } from "mongoose";
import Author from "./Author";

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  author: Author,
  pub_date: { type: Date, default: Date.now, required: true },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

export default model("article", ArticleSchema);
