import express, { json } from "express";
import { validateText } from "./utils/validation";

const makeApp = ({ createContact, getAllContact }: any) => {
  const app = express();
  app.use(json());
  app.post("/contact", async (req, res) => {
    const error = validateText(req.body);
    if (error.length) {
      res.status(400).json(error);
    } else {
      await createContact(req.body);
      res.status(201).json("no content");
    }
  });

  app.get("/contact", async (req, res) => {
    const contacts = await getAllContact();
    if (!contacts.length) {
      res.status(404).send();
    } else {
      res.json(contacts);
    }
  });

  return app;
};

export default makeApp;
