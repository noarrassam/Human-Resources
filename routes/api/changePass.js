const router = require("express").Router();
const UserStores = require("../../mongoDB/mongoDbFiles/store");

router.route("/").post(async (req, res) => {
  if (res) {
    const { Email, Password } = req.body;

    let email = await UserStores.findEmail(Email);
    if (email) {
      let pass = "" + Password;
      await UserStores.updatePassword(Email, pass);
    }
  } else {
    res.status(500).json({ success: false, msg: "Invalid" });
  }
});

module.exports = router;
