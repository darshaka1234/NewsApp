import { model, Schema } from "mongoose";

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pub_date: { type: Date, default: Date.now, required: true },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

export default model("article", ArticleSchema);
