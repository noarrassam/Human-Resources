const router = require("express").Router();
const UserStore = require("../../mongoDB/store");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

router
  .route("/")
  .get(async (req, res, next) => {
    if (res) {
      const result = await UserStore.getUsers();
      console.log("------------------------");
      console.log(result);
      res.status(201).json({
        success: true,
        data: result,
      });
    } else {
      res.status(500).json({ success: false, msg: "Invalid" });
    }
  })

  .post(
    [
      check("Username", "Please include a valid Username").exists(),
      check("Password", "Password is required").exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { Username, Password } = req.body;

      try {
        let user = await UserStore.getUsername(Username);
        console.log(user);

        if (!user) {
          return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
          res.status(400).json({ msg: "Invalid Credentials" });
        }
        const payload = {
          user: {
            id: user.id,
          },
        };
        console.log("----------------", process.env.JWT_SECRET);
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            user.Password = null;
            user.RePassword = null;
            res.json({ token, user });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  );

module.exports = router;
