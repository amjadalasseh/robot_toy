const DIRECTION_MAP = {
  north: {
    value: 'north',
    left: 'west',
    right: 'east'
  },
  east: {
    value: 'east',
    left: 'north',
    right: 'south'
  },
  south: {
    value: 'south',
    left: 'east',
    right: 'west'
  },
  west: {
    value: 'west',
    left: 'south',
    right: 'north'
  }
};

const TABLE_SIZE = { x: 4, y: 4 };

export default class Robot {
  
  constructor(x = 0, y = 0, direction = null, isPlaced = false) {
    this.location = {
      x,
      y
    };
    this.direction = direction;
    this.isPlaced = isPlaced;
  }

  place(paramList) {
    const x = paramList[0];
    const y = paramList[1];
    const direction = DIRECTION_MAP[paramList[2]].value;

    // Ignore if placement is off the table
    if (x > TABLE_SIZE.x || y > TABLE_SIZE.y) {
      return this;
    }

    // Modify robot with directions
    this.isPlaced = true;
    this.location.x = x;
    this.location.y = y;
    this.direction = direction;

    return this;
  }

  move() {
    if (!this.isPlaced) {
      return this;
    }

    let x = this.location.x;
    let y = this.location.y;

    switch (this.direction) {
      case 'north':
        if (++y < TABLE_SIZE.y) {
          this.location = { x, y };
        }
        break;
      case 'east':
        if (++x < TABLE_SIZE.x) {
          this.location = { x, y };
        }
        break;
      case 'south':
        if (--y >= 0) {
          this.location = { x, y };
        }
        break;
      case 'west':
        if (--x >= 0) {
          this.location = { x, y };
        }
        break;
      default:
        break;
    }

    return this;
  }

  turn(direction) {
    if (!this.isPlaced) {
      return this;
    }

    const resultDirection = DIRECTION_MAP[this.direction][direction];

    if (resultDirection) {
      this.direction = resultDirection;
    }

    return this;
  }

  report() {
    if (!this.isPlaced) {
      return this;
    }

    console.log('REPORT: ' + [this.location.x, this.location.y, this.direction.toUpperCase()].join(','));

    return this;
  }

  runInstructions(movementList) {
    let instruction;
    let robot = this;

    for (let i = 0; i < movementList.length; i++) {
      instruction = movementList[i];

      switch (instruction.command) {
        case 'place':
          robot = this.place(instruction.args);
          break;
        case 'turn':
          robot = this.turn(instruction.args);
          break;
        case 'move':
          robot = this.move();
          break;
        case 'report':
          robot = this.report();
          break;
        default:
          break;
      }
 
    }

    return robot;

  }
}