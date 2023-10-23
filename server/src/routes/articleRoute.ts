import { Router } from "express";

const router = Router();

router.get("/", GetAllArticles);
router.get("/:id", GetArticle);
router.post("/", CreateUrticle);
router.put("/:id", UpdateArticle);
router.delete("/:id", DeleteArticle);

export default router;
