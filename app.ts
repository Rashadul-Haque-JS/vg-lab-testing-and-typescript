import express, { json } from "express";
import routes from "./routes";

const makeApp = ({ createContact, getAllContact }: any) => {
  const app = express();
  app.use(json());
  app.use("", routes);

  return app;
};

export default makeApp;
