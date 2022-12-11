import mongoose from "mongoose";
import ClientModel from "../models/clientsModel";
import { Tclient } from "../types/clientsTypes";

export const createClient = async (clientData: Tclient) => {
  return await new ClientModel(clientData).save();
};

export const getClientById = async (id: string) => {
  return await ClientModel.findById(id);
};

export const getAllClient = async () => {
  return await ClientModel.find({}).exec();
};

export const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);