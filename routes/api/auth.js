const router = require("express").Router();
const UserStore = require("../../mongoDB/store");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const dotenv = require("dotenv");
const { check, validationResult } = require("express-validator");

//dotenv.config();
//const TOKEN_SECRET = "1234";

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
            res.json({ token, user });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  );

/*router.route("/register").post(
  [
    check("Firstname", "Firstname is required").not().isEmpty(),
    check("Lastname", "Lastname is required").not().isEmpty(),
    check("Username", "Username is required").not().isEmpty(),
    check("Gender", "Gender is required").not().isEmpty(),
    check("Email", "Please include a valid Email").isEmail(),
    check("Department", "Department is required").not().isEmpty(),
    check("Designation", "Designation is required").not().isEmpty(),
    check("Salary", "Salary is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    const {
      Firstname,
      Lastname,
      Username,
      Gender,
      Email,
      Password,
      RePassword,
      Department,
      Designation,
      Salary,
    } = req.body;

    try {
      let user = await UserStore.getUsername(Username);
      let email = await UserStore.getEmail(Email);
      console.log(user);
      if (user || email) {
        return res
          .status(500)
          .json({ msg: "Username Or Email already exists" });
      }
      res
        .status(201)
        .json({ success: true, data: await UserStore.addUser(req.body) });
      //.json({ success: true, data: await store.addUser(req.body) });

      // const payload = {
      //   user: {
      //     id: req.body,
      //   },
      // };
      // console.log("----------------", process.env.JWT_SECRET);
      // jwt.sign(
      //   req.body,
      //   process.env.JWT_SECRET,
      //   {
      //     expiresIn: 360000,
      //   },
      //   (err, token) => {
      //     if (err) throw err;
      //     user.Password = null;
      //     res.json({ token, user });
      //   }
      // );
    } catch (err) {
      console.error(err);
    }
  }
);*/

module.exports = router;
