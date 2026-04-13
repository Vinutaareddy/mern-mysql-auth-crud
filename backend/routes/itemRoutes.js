import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  stats,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", auth, getItems);
router.post("/", auth, addItem);
router.put("/:id", auth, updateItem);
router.delete("/:id", auth, deleteItem);
router.get("/stats", auth, stats);

export default router;