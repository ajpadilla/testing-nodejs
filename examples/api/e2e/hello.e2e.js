const resquest = require('supertest');

const createApp = require('../src/app');


jest.mock('../src/lib/mongo.lib', () => {
  const MongoLibFake = require("../src/fakes/mongo.lib.fake");
  return jest.fn().mockImplementation(() => {
    return new MongoLibFake();
  });
});

describe('Test for hello endpoint', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3002);
  });

  afterAll(() => {
    server.close();
  });

  describe('test for [GET] /', () => {
    test('should retun "Hello World!"', () => resquest(app)
      .get('/')
      .expect(200)
      .then((response) => {
        expect(response.text).toEqual('Hello World!');
      }));
  });

  describe('test for getBooks', () => {
    test('Should return a list book', async () => {
      // Arrange

    });

    test('Should return a same name', async () => {
      // Arrange

    });
  });

});
