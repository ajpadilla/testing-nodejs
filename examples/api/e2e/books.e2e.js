const resquest = require('supertest');
const { generateManyBooks } = require('../src/fakes/book.fake');

const mockGetAll = jest.fn();

const createApp = require('../src/app');




/*jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));*/

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
    server = app.listen(3001);

    /* jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
      getAll: mockGetAll,
      create: () => {},
    }))); */
  });

  afterAll(() => {
    server.close();
  });

  describe('test for [GET] /api/v1/books', () => {
    test('should retun a list books', () => {
     /* const fakeBooks = generateManyBooks(3);
      mockGetAll.mockResolvedValue(fakeBooks);*/
      return resquest(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          //console.log(body);
          //expect(body.length).toEqual(fakeBooks.length);
          expect(body.length).toEqual(20);
        });
    });
  });
});
