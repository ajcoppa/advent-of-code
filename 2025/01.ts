import { assert } from './lib';

async function main() {
  const input = await Bun.file('01-input.txt').text();
  const instructions = parseInstructions(input);
  console.log(partOne(instructions));
  console.log(partTwo(instructions));
  assert(partTwo([{direction: Direction.Left, degrees: 68}]) === 1, 'Rotating left past zero');
  assert(partTwo([{direction: Direction.Left, degrees: 680}]) === 7, 'Rotating left multiple times past zero');
  assert(partTwo([{direction: Direction.Right, degrees: 50}]) === 1, 'Rotating right exactly to zero');
  assert(partTwo([{direction: Direction.Right, degrees: 150}]) === 2, 'Rotating right past zero');
  assert(partTwo([{direction: Direction.Right, degrees: 249}]) === 2, 'Rotating right just short of an extra time');
  assert(partTwo([{direction: Direction.Right, degrees: 250}]) === 3, 'Rotating right exactly one extra time');
  assert(partTwo([{direction: Direction.Left, degrees: 50}]) === 1, 'Rotating left to zero');
  assert(partTwo([{direction: Direction.Left, degrees: 49}]) === 0, 'Rotating left just short of zero');
  assert(partTwo([
    {direction: Direction.Left, degrees: 50}, // 1
    {direction: Direction.Left, degrees: 100},// 1
  ]) === 2, 'Rotating left exactly to zero twice');
  const exampleInput = await Bun.file('01-example.txt').text();
  assert(partTwo(parseInstructions(exampleInput)) === 6, 'Part 2 example');
}

function partOne(instructions: Instruction[]): number {
  let heading = 50;
  const zeroOccurrences = instructions.filter(instruction => {
    heading += instructionToNumber(instruction) % 100;
    if (heading < 0) {
      heading = 100 + heading;
    }
    if (heading >= 100) {
      heading = heading - 100;
    }
    if (heading === 0) {
      return true;
    }
    return false;
  }).length;
  return zeroOccurrences;
}

function partTwo(instructions: Instruction[]): number {
  let heading = 50;
  const zeroOccurrences = instructions.map(instruction => {
    const oldHeading = heading;
    heading += instructionToNumber(instruction);
    const roundTowardZero = (x: number) => x < 0 ? Math.ceil(x) : Math.floor(x);
    let occurrences = Math.abs(roundTowardZero(heading / 100));
    if ((oldHeading < 0 && heading > 0) || (oldHeading > 0 && heading < 0)) {
      occurrences++;
    }
    if (heading === 0) {
      occurrences++;
    }
    while (heading < 0) {
      heading = 100 + heading;
    }
    while (heading >= 100) {
      heading = heading - 100;
    }
    return occurrences;
  }).reduce((a, b) => a + b, 0);
  return zeroOccurrences;
}

function instructionToNumber(instruction: Instruction): number {
  return instruction.direction === Direction.Left ? -1 * instruction.degrees : instruction.degrees;
}

function parseInstructions(input: string): Instruction[] {
  return input.split('\n').map(line => {
    const direction = line[0] as Direction;
    const degrees = parseInt(line.slice(1), 10);
    return { direction, degrees };
  });
}

enum Direction {
  Left = 'L',
  Right = 'R',
}

type Instruction = {
  direction: Direction;
  degrees: number;
};

main();
