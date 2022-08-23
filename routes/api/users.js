const router = require("express").Router();
const store = require("../../db/store");
const UserStore = require("../../mongoDB/store");
const db = require("../../db/db.json");
const mongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";

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
      // mongoClient.connect(url, function (err, db) {
      //   if (err) {
      //     throw err;
      //   }
      //   var database = db.db("hrdb");
      //   database
      //     .collection("users")
      //     .find({})
      //     .toArray((err, result) => {
      //       if (err) throw err;
      //       //console.log(result);
      //       res.status(201).json(result);
      //     });
      // });
    } else {
      res.status(500).json({ success: false, msg: "Invalid" });
    }
  })

  .post((req, res) => {
    const {
      Person,
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
      !Person &&
      !Firstname &&
      !Lastname &&
      !Username &&
      !Gender &&
      !Email &&
      !Department &&
      !Designation &&
      !Salary
    ) {
      return res.status(500).json({ success: false });
    }
    res.status(201).json({ success: true, data: UserStore.addUser(req.body) });
    //.json({ success: true, data: await store.addUser(req.body) });
  });

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
