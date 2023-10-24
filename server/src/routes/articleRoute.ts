import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import {
  CreateArticle,
  DeleteArticle,
  GetAllArticles,
  GetArticle,
  UpdateArticle,
} from "../controllers/articleController";
import { Upload } from "../middleware/multer";

const router = Router();

router.get("/", GetAllArticles);
router.get("/:id", GetArticle);
router.post("/", verifyToken, Upload.single("image"), CreateArticle);
router.put("/:id", verifyToken, Upload.single("image"), UpdateArticle);
router.delete("/:id", verifyToken, DeleteArticle);

export default router;
