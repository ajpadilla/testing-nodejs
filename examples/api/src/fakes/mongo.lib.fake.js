const { faker } = require('@faker-js/faker');
const LibInterface = require ("../lib/LibInterface");
const { generateManyBooks } = require('./book.fake');

class MongoLibFake extends LibInterface{

  constructor() {
    super();
  }

  async connect() {}

  async getAll(collection, query) {
    return  generateManyBooks(20);
  }

  async get(collection, id) {}

  async create(collection, data) {}

  async update(collection, id, data) {}

  async delete(collection, id) {}
}

module.exports = MongoLibFake;
