const mongoClient = require("mongodb").MongoClient;
const uuidv1 = require("uuid/v1");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const url = "mongodb://localhost:27017/";

class UserStore {
  constructor() {
    //this.initialize();
  }

  initialize() {
    mongoClient.connect(url, function (err, db) {
      if (err) {
        throw err;
      }
      var database = db.db("hrdb");
      database.createCollection("users", function (err, res) {
        if (err) {
          throw err;
        }
        console.log("users collection created");
        db.close();
      });
    });
  }

  async addUser(note) {
    console.log(note);
    const {
      Person,
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
    } = note;

    const newUser = {
      Person,
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
      id: uuidv1(),
    };

    const salt = await bcrypt.genSalt(10);
    newUser.Password = await bcrypt.hash(Password, salt);
    newUser.RePassword = await bcrypt.hash(RePassword, salt);

    return new Promise((resolve, reject) => {
      mongoClient.connect(url, function (err, db) {
        if (err) {
          reject(err);
        }
        var database = db.db("hrdb");
        database.collection("users").insertOne(newUser, function (err, res) {
          if (err) {
            reject(err);
          }
          console.log(newUser + " inserted");
          db.close();
          resolve(res);
        });
      });

      return newUser;
    });
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, function (err, db) {
        if (err) {
          console.error(err);
          reject(err);
        }
        var database = db.db("hrdb");
        database
          .collection("users")
          .find({})
          .toArray(function (err, result) {
            if (err) {
              console.error(err);
              reject(err);
            }
            console.log(result);
            db.close();
            resolve(result);
          });
      });
    });
  }

  getUsername(Username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, function (err, db) {
        if (err) {
          console.error(err);
          reject(err);
        }

        let database = db.db("hrdb");
        database
          .collection("users")
          .findOne({ Username }, function (err, result) {
            if (err) {
              reject(err);
            }
            console.log(result);
            db.close();
            resolve(result);
          });
      });
    });
  }

  getEmail(Email) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, function (err, db) {
        if (err) {
          console.error(err);
          reject(err);
        }

        let database = db.db("hrdb");
        database.collection("users").findOne({ Email }, function (err, result) {
          if (err) {
            reject(err);
          }
          console.log(result);
          db.close();
          resolve(result);
        });
      });
    });
  }
}

module.exports = new UserStore();
