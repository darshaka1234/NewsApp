import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import _ from "lodash";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  const user = _.pick(req.body, ["name", "email", "password", "role"]);
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  try {
    const newUser = new User(user);
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

    res.status(200).header("x-auth-token", token).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
