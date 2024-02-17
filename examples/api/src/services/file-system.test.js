const fs = require('fs');

const {readJsonSync, appendToFileSync, listDirectoryRecursiveSync} = require('./file-system');
const path = require("path");

describe('file-system', () => {
  const fileContents = [
    {
      "name": "Apple",
      "quantity": 7
    },
    {
      "name": "Bread",
      "quantity": 1
    },
    {
      "name": "Tuna",
      "quantity": 2
    },
    {
      "name": "Banana",
      "quantity": 1
    }
  ];

  describe('readJsonSync', () => {
    test('should read JSON file, deserialize its content and return it (synchronously)', () => {
      const result = readJsonSync('../resources/groceries.json');
      expect(result).toEqual(fileContents);
    });
  });

  describe('appendToFileSync()', () => {
    const fileToAppendTo = '../resources/file-to-append-to.txt';
    const localPath = path.join(__dirname, fileToAppendTo);
    it('should append a line to file (synchronously)', () => {
      appendToFileSync(localPath, 'second line');
      const contentBuffer = fs.readFileSync(localPath);
      //console.log('content', contentBuffer.toString());
      expect(contentBuffer.toString()).toEqual('first line\n second line');
    });

    afterEach(() => {
      fs.writeFileSync(localPath, 'first line');
    });
  });

  describe('listDirectoryRecursiveSync()', () => {
    const fileToAppendTo = '../resources';
    const localPath = path.join(__dirname, fileToAppendTo);

    it('should append a line to file (asynchronously)', () => {
      listDirectoryRecursiveSync(localPath);
    });
  });
});
