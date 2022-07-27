const express = require("express");
const dotenv = require("dotenv");
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const logger = require("./middleware/logger");
var cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(logger);
app.use("/api/users", users);

const PORT = process.env.PORT | 3001;

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
