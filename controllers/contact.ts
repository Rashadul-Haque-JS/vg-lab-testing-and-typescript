import ContactModel from "../models/contactModel";
import { validateText } from "../utils/validation";
import { Request, Response } from "express";

export const createContact = async (req: Request, res: Response) => {
  const error = validateText(req.body);
  if (error.length) {
    res.status(400).json(error);
  } else {
    await new ContactModel(req.body);
    res.status(201).json('no content');
  }
};
