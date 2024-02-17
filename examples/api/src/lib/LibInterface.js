const {MongoClient, ObjectId} = require("mongodb");

class LibInterface {

  constructor() {}

  async connect() {}

  async getAll(collection, query) {}

  async get(collection, id) {}

  async create(collection, data) {}

  async update(collection, id, data) {}

  async delete(collection, id) {}

}

module.exports = LibInterface;
