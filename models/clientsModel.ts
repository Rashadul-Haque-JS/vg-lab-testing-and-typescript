import { model, Schema } from "mongoose";
import { Tclient } from "../types/clientsTypes";
const clientSchema = new Schema<Tclient>({
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
