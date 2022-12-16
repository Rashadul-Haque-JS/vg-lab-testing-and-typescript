import express from "express";
import { createContact, getAllContact } from "../controllers/contact";
const router = express.Router();

router.post("/contact", createContact);
router.get("/contact", getAllContact);

export default router;
