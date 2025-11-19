import { Router } from "express";
import { getUser, getUsers } from "../controllers/userController.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

router.get("/", authorize, getUsers);
router.get("/:id", authorize, getUser);
router.post("/", (req, res) => {});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

export default router;
