import { Router } from "express";

const router = Router();

router.get("/",(req,res)=> res.send({title: "Get all subs"}));
router.get("/:id",(req,res)=> res.send({title: "Get sub details"}));
router.post("/",(req,res)=> res.send({title: "Create sub"}));
router.put("/:id",(req,res)=> res.send({title: "Update sub"}));
router.delete("/:id",(req,res)=> res.send({title: "Delete sub"}));
router.get("/user/:id",(req,res)=> res.send({title: "Get all user subs"}));
router.put("/:id/cancel",(req,res)=> res.send({title: "Cancel sub"}));
router.get("/upcoming-renewals",(req,res)=> res.send({title: "'Get | SUB"}));

export default router;