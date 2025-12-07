async function main() {
  const input = await Bun.file('01-input.txt').text();
  const instructions = parseInstructions(input);
  console.log(partOne(instructions));
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
  }).length;
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
