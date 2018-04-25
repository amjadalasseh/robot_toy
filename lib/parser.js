const VALID_DIRECTIONS = ['north', 'south', 'east', 'west'];

function parsePlaceInstruction(placeParts) {
  const placeArgsList = placeParts[1].split(',');

  const x = parseInt(placeArgsList[0], 10);
  const y = parseInt(placeArgsList[1], 10);
  const direction = placeArgsList[2];

  if (!isNaN(x) && !isNaN(y) && (VALID_DIRECTIONS.indexOf(direction) > -1)) {
    return {
      command: 'place',
      args: [x, y, direction]
    };
  } 
    
  return null;
  
}

function parseSingleWordInstruction(instructionString) {
  switch (instructionString) {
    case 'move':
      return {
        command: 'move'
      };
    case 'left':
      return {
        command: 'turn',
        args: 'left'
      };
    case 'right':
      return {
        command: 'turn',
        args: 'right'
      };
    case 'report':
      return {
        command: 'report'
      };
    default:
      return null;
  }
}

function parseInstruction(rawInstructionString) {

  let instructionObject;
  const multiWordInstructionList = rawInstructionString.split(' ');

  if (multiWordInstructionList.length > 1 && multiWordInstructionList[0] === 'place') {
    instructionObject = parsePlaceInstruction(multiWordInstructionList);
  } else {
    instructionObject = parseSingleWordInstruction(rawInstructionString);
  }

  if (instructionObject) {
    return instructionObject;
  }
}

export async function extractMovementList(data) {
  try {

    if (!data.length) {
      console.log('error => Must pass instructions to the robot');
      return false;
    }

    const fullInstructionList = data
      .split('\n')
      .map((instruction) => instruction.toLowerCase().trim())

      .reduce((instructionList, rawInstruction) => {

        const parsedInstruction = parseInstruction(rawInstruction);

        if (parsedInstruction) {
          instructionList.push(parsedInstruction);
        }
        return instructionList;
      }, []);

    if (!fullInstructionList.length) {
      console.log('error => No valid instructions passed');
      return false;
    }

    return fullInstructionList;
  } catch (err) {
    console.log('err==>', err)
  }
  
}

