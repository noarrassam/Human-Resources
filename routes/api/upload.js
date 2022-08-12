const router = require("express").Router();
const store = require("../../dbUploadFiles/store");
const datas = require("../../dbUploadFiles/store");
const db = require("../../dbUploadFiles/db.json");

router.route("/").post((req, res) => {
  const file = req.files.file;
  console.log(file);
  const filename = file.name;
  const categoryName = req.body.category;
  const employeeId = req.body.employeeId;
  const filesAndDatas = { filename, categoryName, employeeId };
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

router.route("/download/:fileName/:employeeId").get(async (req, res) => {
  const fileName = req.params.fileName;
  console.log(fileName);
  const filePath = "./uploads/" + fileName;
  console.log(fileName);
  const id = req.params.employeeId;
  const found = db.find((emp) => emp.employeeId == id);
  if (!found) {
    res.status(401).json({
      success: false,
    });
  } else {
    res.status(201).json({
      success: true,
      data: await store.getFiles(),
      files: res.download(filePath),
    });
  }
});

// router.route("/download/:employeeId").get(async (req, res) => {
//   const fileName = req.params.fileName;
//   console.log(fileName);
//   const filePath = "./uploads/" + fileName;
//   console.log(fileName);
//   const id = req.params.employeeId;
//   const found = db.find((emp) => emp.id == id);
//   if (!found) {
//     res.status(401).json({
//       success: false,
//     });
//   } else {
//     res.status(201).json({
//       success: true,
//       data: await store.getFiles(),
//       files: res.download(filePath),
//     });
//   }
// });

module.exports = router;
