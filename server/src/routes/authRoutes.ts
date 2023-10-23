import { Router } from "express";

const router = Router();

router.post("/", RegisterUser);
router.post("/:id", loginUser);

export default router;
