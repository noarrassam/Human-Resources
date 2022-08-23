const util = require("util");
const fs = require("fs");
const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf-8");
  }

  write(user) {
    return writeFileAsync("db/db.json", JSON.stringify(user));
  }

  getUsers() {
    return this.read().then((users) => {
      let parsedUsers;

      try {
        parsedUsers = [].concat(JSON.parse(users));
      } catch (err) {
        parsedUsers = [];
      }
      return parsedUsers;
    });
  }

  addUser(note) {
    const {
      Person,
      isAdmin,
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

    if (
      !Person ||
      !isAdmin ||
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
    }

    const newUser = {
      Person,
      isAdmin,
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

    return this.getUsers()
      .then((users) => [...users, newUser])
      .then((updateUsers) => this.write(updateUsers))
      .then(() => newUser);
  }

  removeUser(id) {
    return this.getUsers()
      .then((users) => users.filter((user) => user.id !== id))
      .then((filteredUsers) => this.write(filteredUsers));
  }
}

module.exports = new Store();
