import { createClient, getClientById,getAllClient } from "../db/database";
import { validateEmail,validateZipCode,validatePersonalNumber } from "../utils/validation";
import { Request,Response } from "express";
export const createContact =(req:Request,res:Response)=>{
    const {firstname,lastname,email,personalnumber,address,zipCode,city,country}= req.body
    const error = []
}