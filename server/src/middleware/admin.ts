import { Request, Response, NextFunction } from "express";
import jwtDecode from "jwt-decode";

interface PayloadType {
  _id: number;
  iat: number;
  role: string;
}

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("x-auth-token");
  const decodedPayload: PayloadType = jwtDecode(token!);
  try {
    if (decodedPayload?.role !== "Admin") {
      return res.status(403).send("Access Denied");
    }

    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
