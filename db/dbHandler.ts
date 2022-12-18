import ContactModel from "../models/contactModel";
import { TClient } from "../types/types";

export const createContact = async (contactData: TClient) => {
  return await new ContactModel(contactData).save();
};

export const getAllContact = async () => {
  return await ContactModel.find({}).exec();
};

export const getContactById = async (id: string) => {
  return await ContactModel.findById(id);
};