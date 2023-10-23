import { model, Schema } from "mongoose";

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
});

export default model("Author", AuthorSchema);
