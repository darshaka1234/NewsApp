import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import _ from "lodash";
import Author from "../models/Author";

export const register = async (req: Request, res: Response) => {
  const author = _.pick(req.body, ["name", "email", "password", "role"]);
  const salt = await bcrypt.genSalt();
  author.password = await bcrypt.hash(author.password, salt);

  try {
    const newAuthor = new Author(author);
    const saveAuthor = await newAuthor.save();
    res.status(201).json(saveAuthor);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const author = await Author.findOne({ email: email });
    if (!author) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, author.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: author._id }, process.env.JWT_SECRET!);

    res.status(200).header("x-auth-token", token).json(author);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
