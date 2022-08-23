const mongoClient = require("mongodb").MongoClient;
const uuidv1 = require("uuid/v1");

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

  addUser(note) {
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

    /*if (
      !Person ||
      !Firstname ||
      !Lastname ||
      !Username ||
      !Gender ||
      !Email ||
      !Password ||
      !RePassword ||
      !Department ||
      !Designation ||
      !Salary
    ) {
      throw new Error("Cannot be blank");
    }*/

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

    mongoClient.connect(url, function (err, db) {
      if (err) {
        throw err;
      }
      var database = db.db("hrdb");
      database.collection("users").insertOne(newUser, function (err, res) {
        if (err) {
          throw err;
        }
        console.log(newUser + " inserted");
        db.close();
      });
    });

    return newUser;
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
}

module.exports = new UserStore();
