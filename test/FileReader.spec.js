import { expect } from 'chai';
import path from 'path';
import { readFromFile } from '../lib/FileReader';

describe('FileReader', function () {
 
  it('should throw an undefined if the file is not a text file', async () => {
    expect(await readFromFile(path.join(__dirname, 'data/nonTextFile.xml'))).to.equal(undefined);
  });

  it('should correctly read in the contents of a text file', async () => {
    expect(await readFromFile(path.join(__dirname, 'data/test1.txt'))).to.equal('PLACE 0,0,NORTH\r\nMOVE\r\nREPORT');      
  });

  it('should throw an error if file is empty', async () => {
    expect(await readFromFile(path.join(__dirname, 'data/testEmpty.txt'))).to.equal(false);      
  });
});