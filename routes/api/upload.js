const router = require("express").Router();
const store = require("../../dbUploadFiles/store");
const datas = require("../../dbUploadFiles/store");
const dataFiles = require("../../mongoDB/mongoDbFiles/store");
const db = require("../../dbUploadFiles/db.json");

router.route("/").post(async (req, res) => {
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
        files: await dataFiles.addFiles(filesAndDatas),
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.route("/download/:employeeId").get(async (req, res) => {
  // const id = req.params.employeeId;
  // const dbID = dataFiles.getFiles();
  // const found = db.find((emp) => {
  //   console.log(emp);
  //   return emp.employeeId == id;
  // });
  // if (!found) {
  //   res.status(401).json({
  //     success: false,
  //   });
  // } else {
  if (res) {
    res.status(201).json({
      success: true,
      data: await dataFiles.getFiles(),
    });
  } else {
    res.status(500).json({
      success: false,
    });
  }
  // }
});

router.route("/info/:id").delete(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const ret = await dataFiles.removeFiles(id);

  console.log(ret);
  if (ret.deletedCount) {
    res.status(201).json({ success: true, data: ret });
  } else {
    res.status(500).json({ success: false });
  }
  /*let arr = await dataFiles.database();
  let array = [...arr];
  console.log(array);
  const found = array.find((data) => data.id === id);
  console.log(found);
  if (!found) {
    res.status(401).json({ success: false });
  } else {
    const ret = await dataFiles.removeFiles(id);
    res.status(201).json({ success: true, data: ret });
  }*/
});

module.exports = router;
