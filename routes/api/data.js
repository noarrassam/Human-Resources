const router = require("express").Router();

router
  .route("/")
  .get((req, res, next) => {
    try {
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  })
  .post((req, res, next) => {
    try {
        //const {}
    } catch (error) {
      next(error);
    }
  });
