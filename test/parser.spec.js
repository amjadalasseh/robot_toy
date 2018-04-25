import {expect} from 'chai';
import { extractMovementList } from '../lib/parser';

describe('Parser', function () {

  it('should throw an error if no instructions are passed', async() => {
    expect(await extractMovementList('')).to.equal(false);
  });

  it('should correctly parse file contents into an array of instructions', async () =>{

    expect(await extractMovementList('PLACE 0,0,NORTH\nMOVE\nLEFT\nRIGHT\nREPORT')).to.deep.equal([
      {
        command: 'place',
        args: [0, 0, 'north']
      }, {
        command: 'move'
      }, {
        command: 'turn',
        args: 'left'
      }, {
        command: 'turn',
        args: 'right'
      }, {
        command: 'report'
      }
    ]); 
  });

  it('should not parse any unknown instructions', async ()=> {
    
    expect(await extractMovementList('PLACE 0,0,NORTH\nslartybartfast\nmarco polo\nPLACE 0,1,north-west\nMOVE\nREPORT')).to.deep.equal([
      {
        command: 'place',
        args: [0, 0, 'north']
      }, {
        command: 'move'
      }, {
        command: 'report'
      }
    ]);

  });
});