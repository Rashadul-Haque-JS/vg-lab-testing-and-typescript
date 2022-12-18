import express, { json } from "express";
import { validateText } from "./utils/validation";
import { isValidId } from "./models/contactModel";
import fetchGeocode from "./utils/geocoding";
import { TClient } from "./types/types";

const makeApp = ({ createContact, getAllContact, getContactById }: any) => {
  const app = express();
  app.use(json());

  // Create a new contact
  app.post("/contact", async (req, res) => {
    const error = validateText(req.body);
    if (error.length) {
      res.status(400).json(error);
    } else {
      await createContact(req.body);
      res.status(201).json("no content");
    }
  });

  // Get all contacts
  app.get("/contact", async (req, res) => {
    const contacts = await getAllContact();
    if (!contacts.length) {
      res.status(404).send();
    } else {
      res.json(contacts);
    }
  });

  // Get contact by id
  app.get("/contact/:id", async (req, res) => {
    if (!isValidId(req.params.id)) {
      res.status(400).send();
    } else {
      const contact = await getContactById(req.params.id);
      if (!contact) {
        res.status(404).send();
      } else {
        const geocode = await fetchGeocode(contact);
        const lat = geocode.data[0].latitude;
        const lng = geocode.data[0].longitude;
        const {
          firstname,
          lastname,
          email,
          personalnumber,
          address,
          zipCode,
          city,
          country,
        } = contact as TClient;
        res.json({
          id: contact._id,
          firstname,
          lastname,
          email,
          personalnumber,
          address,
          zipCode,
          city,
          country,
          lat,
          lng,
        });
      }
    }
  });

  return app;
};

export default makeApp;