const resquest = require('supertest');

const createApp = require('../src/app');
describe('Test for hello endpoint', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
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
});
