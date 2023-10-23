import { Router } from "express";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get("/", GetAllArticles);
router.get("/:id", GetArticle);
router.post("/", verifyToken, CreateUrticle);
router.put("/:id", verifyToken, UpdateArticle);
router.delete("/:id", verifyToken, DeleteArticle);

export default router;
