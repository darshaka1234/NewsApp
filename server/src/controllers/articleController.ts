import { Request, Response } from "express";
import _ from "lodash";
import Article from "../models/Article";
import cloudinary from "../config/cloudinary.config";

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

export const CreateArticle = async (req: Request, res: Response) => {
  const article = _.pick(req.body, [
    "title",
    "author",
    "pub_date",
    "description",
    "imageUrl",
  ]);

  try {
    const result = await cloudinary.v2.uploader.upload(req.file?.path!);
    article.imageUrl = result.secure_url;

    const newArticle = new Article(article);
    const createdArticle = await newArticle.save();
    res.status(201).json(createdArticle);
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
};

export const UpdateArticle = async (req: Request, res: Response) => {
  const articleData = _.pick(req.body, [
    "title",
    "author",
    "pub_date",
    "description",
    "imageUrl",
  ]);
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      res.status(404).json({ error: "Article not found" });
    }
    const result = await cloudinary.v2.uploader.upload(req.file?.path!);
    articleData.imageUrl = result.secure_url;
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      articleData,
      { new: true }
    );

    res.status(201).json(updatedArticle);
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
};

export const DeleteArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      res.status(404).json({ error: "Article not found" });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.status(201).json("Successfully deleted");
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
};
