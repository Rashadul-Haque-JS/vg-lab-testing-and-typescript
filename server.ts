import makeApp from "./app";
import connect from "./db/connection";
import * as dotenv from "dotenv";
dotenv.config();
import { createContact,getAllContact,getContactById} from "./db/dbHandler";
const port = process.env.PORT || 8000;
const app = makeApp({createContact, getAllContact, getContactById});
app.listen(port, () => {
  connect();
  console.log(`Server listening on port ${port}`);
});
