const router = require("express").Router();
const store = require("../../db/store");
const UserStore = require("../../mongoDB/store");
const db = require("../../db/db.json");
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
      check("Firstname", "Firstname is required").not().isEmpty(),
      check("Lastname", "Lastname is required").not().isEmpty(),
      check("Username", "Username is required").not().isEmpty(),
      check("Gender", "Gender is required").not().isEmpty(),
      check("Email", "Please include a valid Email").isEmail(),
      check("Password", "Please include a valid Password")
        .optional()
        .isLength({ min: 6 }),
      check("RePassword", "Please include a valid RePassword")
        .optional()
        .isLength({ min: 6 }),
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
      } catch (err) {
        console.error(err);
      }
    }
  );

router.delete("/:id", (res, req, next) => {
  const found = db.find((user) => user.id == req.params.id);
  if (!found) {
    return res
      .status(500)
      .json({ msg: `No Note with the ID of ${req.params.id}` });
  } else {
    res
      .status(201)
      .json({ success: true, data: store.removeUser(req.params.id) });
  }
});

module.exports = router;
