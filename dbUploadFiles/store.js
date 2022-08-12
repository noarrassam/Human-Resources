const util = require("util");
const fs = require("fs");
const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("dbUploadFiles/db.json", "utf-8");
  }

  write(user) {
    return writeFileAsync("dbUploadFiles/db.json", JSON.stringify(user));
  }

  getFiles() {
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

    return this.getFiles()
      .then((files) => [...files, newFormData])
      .then((updatedFiles) => this.write(updatedFiles))
      .then(() => newFormData);
  }

  removeFiles(id) {
    return this.getFiles()
      .then((users) => users.filter((user) => user.id !== id))
      .then((filteredUsers) => this.write(filteredUsers));
  }
}

module.exports = new Store();
