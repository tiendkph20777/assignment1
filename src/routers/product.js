import express from "express"
import { create, get, getAll, remove, update } from "../controllers/product"

const router = express.Router()

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products/add", create);
router.put("/products/edit/:id", update);
router.delete("/products/delete/:id", remove);

export default router;