const express = require("express");
const dotenv = require("dotenv");
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const logger = require("./middleware/logger");
var cors = require("cors");
const fileupload = require("express-fileupload");
const uploads = require("./routes/api/upload");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", users);
app.use(fileupload());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use("/upload", uploads);

app.use(logger);
const PORT = process.env.PORT | 3001;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
