const router = require("express").Router();
const datas = require("../../dbUploadFiles/store");
//const db = require("../../dbUploadFiles/db.json");

router.route("/").post((req, res) => {
  const file = req.files.file;
  console.log(file);
  const filename = file.name;
  const categoryName = req.body.category;
  const filesAndDatas = { filename, categoryName };
  console.log(categoryName);

  try {
    if (!req.files && !req.body) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      const base = "./uploads/";
      file.mv(base + filename);
      res.status(201).json({
        status: true,
        message: "File is uploaded",
        data: {
          name: file.name,
          mimetype: file.mimetype,
          size: file.size,
        },
        files: datas.addFiles(filesAndDatas),
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.route("/download/:fileName").get((req, res) => {
  const fileName = req.params.fileName;
  console.log(fileName);
  const filePath = "./uploads/" + fileName;
  console.log(fileName);
  //res.setHeader("Content-Disposition", "attachment; " + fileName);
  res.download(filePath);
});

module.exports = router;
