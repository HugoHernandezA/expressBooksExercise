// Modules
const express = require('express');
const BookResources = express.Router();

// Controllers
const { BookControllers } = require('../controllers');

// All user resources
BookResources.get('/', BookControllers.getAll);
BookResources.post('/', BookControllers.createBook);
BookResources.get('/:guid', BookControllers.getByGuid);
BookResources.put('/:guid', BookControllers.updateBook);
BookResources.delete('/:guid', BookControllers.deleteBook);

module.exports = BookResources;
