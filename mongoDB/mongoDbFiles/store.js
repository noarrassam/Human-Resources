const mongoClient = require("mongodb").MongoClient;
const uuidv1 = require("uuid/v1");
const bcrypt = require("bcryptjs");

const url = "mongodb://localhost:27017/";

class FileStore {
  initialize() {
    mongoClient.connect(url, function (err, db) {
      if (err) {
        throw err;
      }
      var database = db.db("hrdb");
      database.createCollection("userFiles", function (err, res) {
        if (err) {
          throw err;
        }
        console.log("userFiles collection created");
        db.close();
      });
    });
  }

  addFiles(formData) {
    const { filename, categoryName, employeeId } = formData;
    if (!filename) {
      throw new Error("fileName Cannot be blank");
    }
    if (!categoryName) {
      throw new Error("categoryName Cannot be blank");
    }

    if (!employeeId) {
      throw new Error("employeeId Cannot be blank");
    }

    const newFormData = { filename, categoryName, employeeId, id: uuidv1() };

    mongoClient.connect(url, function (err, db) {
      if (err) {
        return err;
      }
      var database = db.db("hrdb");
      database
        .collection("userFiles")
        .insertOne(newFormData, function (err, res) {
          if (err) {
            return err;
          }
          db.close();
        });
    });
    return newFormData;
  }

  getFiles() {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, function (err, db) {
        if (err) {
          return reject(err);
        }
        var database = db.db("hrdb");
        database
          .collection("userFiles")
          .find({})
          .toArray(function (err, result) {
            if (err) {
              return reject(err);
            }
            db.close();
            console.log(result);
            resolve(result);
          });
      });
    });
  }

  removeFiles(id) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, function (err, db) {
        if (err) {
          reject(err);
        }
        var database = db.db("hrdb");
        database
          .collection("userFiles")
          .deleteOne({ id: id })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }

  findEmail(Email) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, function (err, db) {
        if (err) {
          reject(err);
        }
        var database = db.db("hrdb");
        database
          .collection("users")
          .findOne({ Email: Email })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }

  async updatePassword(email, password) {
    const salt = await bcrypt.genSalt(10);
    const paramPassword = await bcrypt.hash(password, salt);
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, function (err, db) {
        if (err) {
          reject(err);
        }
        const whereQuery = { Email: email };
        const updateQuery = {
          $set: { Password: paramPassword, RePassword: paramPassword },
        };
        var database = db.db("hrdb");
        database
          .collection("users")
          .updateOne(whereQuery, updateQuery)
          .then((res) => {
            console.log("Update happened ", res);
            resolve(res);
          })
          .catch((err) => {
            console.error("Error in Update ", err);
            reject(err);
          });
      });
    });
  }
}

module.exports = new FileStore();
