import app from "./app";
import connect from "./db/connection";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  connect();
  console.log(`Server listening on port ${port}`);
});

