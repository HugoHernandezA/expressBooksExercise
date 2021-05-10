// Models
const { Book } = require('../models');
const validator = require('validator');

// Fecth all books
const getAll = (req, res) => {
  Book.getAll((books) => {
    res.send(books);
  });
};

// Get book by guid
/*const getByGuid = (req, res) => {
  const { guid } = req.params;
  // Read all user
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find(ent => ent.guid === guid);

    if (book) {
      res.send(book);
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
};*/

// Get book by guid
const getByGuid = (req, res) => {
  const { guid } = req.params;
  // Read all user
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find(ent => ent.guid === guid) || books.find(ent => ent.title === guid) || books.find(ent => ent.author === guid) || books.find(ent => ent.year === Number(guid));

    if (book) {
      res.send(book);
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
};

// Add new book to books
/*const createBook = (req, res) => {
  const { body } = req;
  // Create new instance
  const newBook = new Book(body);
  console.log(typeof newBook.title);
  console.log(typeof newBook.author);
  console.log(typeof newBook.year);
  console.log(Array.isArray(newBook.tags));
  // Save in db
  newBook.save();
  res.send({
    message: 'Book successfully created!!!',
    guid: newBook.getGuid(),
  });
};*/

// Add new book to books
/*const createBook = (req, res) => {
  const { body } = req;
  // Create new instance
  const newBook = new Book(body);
  if(typeof newBook.title === "string" && typeof newBook.author === "string" && typeof newBook.year === "number" && Array.isArray(newBook.tags)){
    // Save in db
    newBook.save();
    res.send({
      message: 'Book successfully created!!!',
      guid: newBook.getGuid(),
    });
  }
  else{
    res.status(404).send({
      message: 'Book was not able to be created!'
    });
  }
};*/

// Add new book to books
const createBook = (req, res) => {
  const { body } = req;
  // Create new instance
  const newBook = new Book(body);
  if(typeof newBook.title === "string" && typeof newBook.author === "string" && typeof newBook.year === "number" && Array.isArray(newBook.tags)){
    Book.getAll((books) => {
      const book = books.find(ent => ent.title === newBook.title) || books.find(ent => ent.author === newBook.author) || books.find(ent => ent.year === newBook.year);
  
      if (book) {
        if (newBook.title !== book.title || newBook.author !== book.author || newBook.year !== book.year ){
          newBook.save();
          res.send({
            message: 'Book successfully created!',
            guid: newBook.getGuid(),
          });
        } else {
          res.status(403).send({
            message: 'Book is already in the database and cannot be created!'
          });
        }
      } else {
        newBook.save();
        res.send({
          message: 'Book successfully created!!!',
          guid: newBook.getGuid(),
        });
      }
    });
  } else{
    res.status(403).send({
      message: 'Book has incorrect data input or type and cannot be created!'
    });
  }



};

// Update an existing book
const updateBook = (req, res) => {
  const { params: { guid }, body } = req;
  // Read all books
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find(ent => ent.guid === guid);

    if (book) {
      Object.assign(book, body);
      Book.update(books);
      res.send({
        message: 'Book successfully updated!!!',
      });
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
};

// Delete book from books
const deleteBook = (req, res) => {
  const { guid } = req.params;
  // Read all books
  Book.getAll((books) => {
    // Filter by guid
    const bookIdx = books.findIndex(ent => ent.guid === guid);

    if (bookIdx !== -1) {
      books.splice(bookIdx, 1);
      Book.update(books);
      res.send({
        message: 'Book successfully deleted!!!',
      });
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
};

module.exports = {
  getAll,
  getByGuid,
  createBook,
  updateBook,
  deleteBook
};
