const router = require("express").Router();
const UserStore = require("../../mongoDB/mongoDbFiles/store");
const emailModule = require("./sendEmail");

router.route("/").post(async (req, res) => {
  if (res) {
    const { Email } = req.body;

    let email = await UserStore.findEmail(Email);
    if (email) {
      let password = Math.random() * (1000000 - 100000) + 100000;
      password = Math.ceil(password);
      password = "" + password;
      console.log(password);
      await UserStore.updatePassword(Email, password);
      emailModule.sendResetPasswordEmail(Email, password);
    }
  } else {
    res.status(500).json({ success: false, msg: "Invalid" });
  }
});

module.exports = router;
