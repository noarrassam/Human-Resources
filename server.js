const express = require("express");
const dotenv = require("dotenv");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const resetPass = require("./routes/api/resetPass");
const uploads = require("./routes/api/upload");
const bodyParser = require("body-parser");
const logger = require("./middleware/logger");
var cors = require("cors");
const fileupload = require("express-fileupload");
const jwt = require("jsonwebtoken");

dotenv.config();

const jwtAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", jwtAuthenticate, users);
app.use("/api/auth", auth);
app.use("/api/resetPass", resetPass);
app.use(fileupload());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use("/upload", jwtAuthenticate, uploads);

app.use(logger);
const PORT = process.env.PORT | 3001;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
