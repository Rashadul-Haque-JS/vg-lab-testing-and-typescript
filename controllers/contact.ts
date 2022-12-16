import ContactModel from "../models/contactModel";
import { validateText } from "../utils/validation";
import { Request, Response } from "express";
import { isValidId } from "../models/contactModel";
import fetchGeocode from "../utils/geocoding";
import { TClient } from "../types/types";

// Create contact
export const createContact = async (req: Request, res: Response) => {
  const error = validateText(req.body);
  if (error.length) {
    res.status(400).json(error);
  } else {
    await new ContactModel(req.body);
    res.status(201).json("no content");
  }
};

// Get contact by id


// Get all contact
export const getAllContact = async (req: Request, res: Response) => {
  const contacts = await ContactModel.find({}).exec();
  if (!contacts.length) {
    res.status(404).send();
  } else {
    res.json(contacts);
  }
};
