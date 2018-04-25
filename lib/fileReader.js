import fs from 'fs';

function validateFile(argString) {
  const splitArray = argString.split('.');
  const len = splitArray.length;

  if (len === 1 && splitArray[0] === argString || splitArray[len - 1] !== 'txt') {
    return false;
  }
  return true;
}

function getFileData(argString) {
  return new Promise(resolve => {
    fs.readFile(argString, { encoding: 'utf-8' }, function (err, data) {
      if (err) {
        console.log('err==>', err);
        throw err;
      } 
      resolve(data);
    });
  });
}

export async function readFromFile(fileName) {
  try {
    if (validateFile(fileName)) {
      const fileData = await getFileData(fileName);
      if (fileData && fileData.length > 0) {
        return fileData;
      }
      return false;
    }
  } catch (err) {
    console.log('err==>', err);
    throw err;
  }
}