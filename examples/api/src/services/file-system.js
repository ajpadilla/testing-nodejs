const fs = require('fs');
const path = require('path');

function readJsonSync(filePath) {
  try {
    const localPath = path.join(__dirname, filePath);
    console.log('path', localPath);
    const jsonString = fs.readFileSync(
      localPath,
      { encoding: 'utf8', flag: 'r' },
    );
    return JSON.parse(jsonString);
  } catch (error) {
    console.log(error);
  }
}

function appendToFileSync(filePath, text) {
  try {
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `\n ${text}`, { flag: 'a+' });
    }
  } catch (err) {
    console.log(err);
  }
}
async function readJsonAsync(filePath) {
  return new Promise((resolve, reject) => {
    const localPath = path.join(__dirname, filePath);
    console.log('path', localPath);
    const jsonString = fs.readFileSync(
      localPath,
      { encoding: 'utf8', flag: 'r' },
    );
    (filePath && jsonString) ? resolve(JSON.parse(jsonString)) : reject('promise shouldn\'t be resolved');
  });
}

async function listDirectoryRecursiveSync(currentPath) {
  // console.log('File Path', currentPath);
  // console.log('archivos', fs.readdirSync(currentPath));
  let hasNextDir = false;
  let countP = 0;
  let principalList = [];

  while (!hasNextDir)
  {
    console.log('File Path', currentPath, `count: ${countP}`);

    const listoOfFiles = fs.readdirSync(currentPath);
    let dirCount = 0;
    let fileCount = 0;
    const objectDir = {};
    const filesPathsList = [];

    if (countP > 0) {
      objectDir.type = 'directory';
      objectDir.path = currentPath;
    }
    for (const item of listoOfFiles) {
      // const filePath = path.join(__dirname, `../resources/${item}`);
      const filePath = `${currentPath}/${item}`;
      const fileStat = fs.statSync(filePath);
      if (fileStat.isDirectory()) {
        currentPath = filePath;
        dirCount++;
      } else {
        filesPathsList.unshift({
          type: 'file',
          path: filePath,
        });
        fileCount++;
      }
    }
    if (countP > 0) {
      objectDir.children = [...filesPathsList];
      principalList.push(objectDir);
    } else {
      principalList = [...filesPathsList];
    }

    if (dirCount === 0) {
      hasNextDir = true;
    }
    console.log(`Dirs: ${dirCount} files: ${fileCount} Next Dir: ${currentPath} Next Dir: ${hasNextDir} list : ${JSON.stringify(principalList)}`);
    countP++;
  }
}

async function listDirectoryTreeAsync(currentPath) {

}

module.exports = {
  readJsonSync,
  appendToFileSync,
  readJsonAsync,
  listDirectoryRecursiveSync,
  listDirectoryTreeAsync
};
