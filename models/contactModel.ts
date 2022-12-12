import { model, Schema, Types } from "mongoose";
import { TClient } from "../types/types";
const contactSchema = new Schema<TClient>({
  firstname: String,
  lastname: String,
  email: String,
  personalnumber: String,
  address: String,
  zipCode: String,
  city: String,
  country: String,
});
const ContactModel = model("contact", contactSchema);
export const isValidId = (id: string) => Types.ObjectId.isValid(id);
export default ContactModel;
