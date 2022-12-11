import { model, Schema } from "mongoose";
import { TClient } from "../types/types";
const clientSchema = new Schema<TClient>({
  firstname: String,
  lastname: String,
  email: String,
  personalnumber: String,
  address: String,
  zipCode: String,
  city: String,
  country: String,
});
const ClientModel = model("client", clientSchema);
export default ClientModel;
