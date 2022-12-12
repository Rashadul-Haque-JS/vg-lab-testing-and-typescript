import makeApp from "./app";
import connect from "./db/connection";
import * as dotenv from "dotenv";
dotenv.config();
import { createContact } from "./controllers/contact";
const port = process.env.PORT || 8000;
const app = makeApp(createContact);
app.listen(port, () => {
  connect();
  console.log(`Server listening on port ${port}`);
});
