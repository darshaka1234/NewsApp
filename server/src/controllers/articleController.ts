import { Request, Response } from "express";
import Article from "../models/Article";

export const GetAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find();

    res.status(200).json(articles);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const GetArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      res.status(404).json({ error: "Article not found" });
    } else {
      res.status(200).json(article);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
