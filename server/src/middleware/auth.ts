import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("x-auth-token");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer")) {
      token = token.slice(7).trim();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET!);

    if (!verified) {
      return res.status(403).send("Access Denied");
    }

    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
