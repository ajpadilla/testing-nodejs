const BookService = require('./books.service');
const { generateManyBooks } = require('../fakes/book.fake');


/* const fakeBooks = [
  {
    _id: 1,
    name: 'Harry Potter',
  },
  {
    _id: 2,
    name: 'Las mil y una noche',
  },
]; */

const mockGetAll = jest.fn();

/*jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));*/

jest.mock('../lib/mongo.lib', () => {
  const MongoLibFake = require("../fakes/mongo.lib.fake");
  return jest.fn().mockImplementation(() => {
    return new MongoLibFake();
  });
});

describe('Test for BookService', () => {
  let service;
  beforeEach(() => {
    service = new BookService();
    jest.clearAllMocks();
  });

  describe('test for getBooks', () => {
    test('Should return a list book', async () => {
      // Arrange
     // mockGetAll.mockResolvedValue(generateManyBooks(20));
      // Act
      const books = await service.getBooks();
      //console.log(books);
      // Assert
      expect(books.length).toEqual(20);
      expect(service.getBooks).toHaveBeenCalled();
      expect(service.getBooks).toHaveBeenCalledTimes(1);
      expect(service.getBooks).toHaveBeenCalledWith('books', undefined)
      /*expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith('books', undefined);*/
    });

    /*test('Should return a same name', async () => {
      // Arrange
      const fakeBooks = generateManyBooks(4);
      mockGetAll.mockResolvedValue(fakeBooks);

      const books = await service.getBooks();
      expect(books[0].name).toEqual(fakeBooks[0].name);
    });*/
  });
});
