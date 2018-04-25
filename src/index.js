import { readFromFile } from '../lib/fileReader';
import { extractMovementList } from '../lib/parser';
import Robot from '../lib/robot';

const FILE_NAME = process.argv[2];

async function DoMovement(){
  const textInFile = await readFromFile(FILE_NAME);
  if (textInFile){
    const list = await extractMovementList(textInFile);
    let robot = new Robot();
    robot.runInstructions(list);  
  }
}


DoMovement();



