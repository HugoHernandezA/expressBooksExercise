// Modules
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Path to users.json
const p = path.join(path.dirname(require.main.filename), 'data', 'users.json');

module.exports = class Book {
  constructor(data) {
    const { title, author, year, tags } = data;
    this.title = title;
    this.author = author;
    this.year = year;
    this.tags = tags;
    this.guid = uuid.v4();
  }

  getGuid() {
    return this.guid;
  }

  // We push a new user to users array and save
  save() {
    // We read the file everytime we need to modify it
    fs.readFile(p, (err, data) => {
      let books = [];
      if (!err) {
        books = JSON.parse(data);
      }
      books.push(this);
      // Write the file
      fs.writeFile(p, JSON.stringify(books), (err) => console.log(err));
    })
  }

  // We update data with the given one
  static update(books) {
    fs.writeFile(p, JSON.stringify(books), (err) => console.log(err));
  }

  // get and parse the data (async)
  static getAll(cb) {
    fs.readFile(p, (err, data) => {
      let books = [];
      if (!err) {
        books = JSON.parse(data);
      }
      // callback function when the data is ready
      cb(books);
    });
  }
};
