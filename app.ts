import express, { json } from "express";
import contact from "./routes";

const makeApp = ({ createContact }: any) => {
  const app = express();
  app.use(json());
  app.use("", contact);
  return app;
};

export default makeApp;
