const router = require("express").Router();
const store = require("../../db/store");
const db = require("../../db/db.json");

router
  .route("/")
  .get(async (req, res, next) => {
    if (res) {
      res.status(201).json({
        success: true,
        data: await store.getUsers(),
      });
    } else {
      res.status(400).json({ success: false, msg: "Invalid" });
    }
  })
  .post(async (req, res) => {
    const {
      Firstname,
      Lastname,
      Username,
      Gender,
      Email,
      Department,
      Designation,
      Salary,
    } = req.body;

    if (
      !Firstname &&
      !Lastname &&
      !Username &&
      !Gender &&
      !Email &&
      !Department &&
      !Designation &&
      !Salary
    ) {
      return res.status(400).json({ success: false });
    }
    res
      .status(201)
      .json({ success: true, data: await store.addUser(req.body) });
  });

router.delete("/:id", (res, req, next) => {
  const found = db.find((user) => user.id == req.params.id);
  if (!found) {
    return res
      .status(401)
      .json({ msg: `No Note with the ID of ${req.params.id}` });
  } else {
    res
      .status(201)
      .json({ success: true, data: store.removeUser(req.params.id) });
  }
});

module.exports = router;
