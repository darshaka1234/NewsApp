import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import {
  DeleteArticle,
  GetAllArticles,
  GetArticle,
  UpdateArticle,
} from "../controllers/articleController";

const router = Router();

router.get("/", GetAllArticles);
router.get("/:id", GetArticle);
router.post("/", verifyToken, GetArticle);
router.put("/:id", verifyToken, UpdateArticle);
router.delete("/:id", verifyToken, DeleteArticle);

export default router;
