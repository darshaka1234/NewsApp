import { model, Schema } from "mongoose";

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: "enum", enum: ["Admin", "Geust"], required: true },
});

export default model("Author", AuthorSchema);
