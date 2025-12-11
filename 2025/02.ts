import { chunk, sum } from './lib';

async function main() {
  const input = await Bun.file('02-input.txt').text();
  const ranges = parseRanges(input);
  console.log(partOne(ranges));
  console.log(partTwo(ranges));
}

function partOne(ranges: Range[]): number {
  return sum(findInvalidIds(ranges, isInvalidId));
}

function partTwo(ranges: Range[]): number {
  return sum(findInvalidIds(ranges, isInvalidIdTwo));
}

function findInvalidIds(ranges: Range[], predicate: (id: number) => boolean): number[] {
  return ranges.reduce((acc: number[], range: Range) => {
    const invalidInRange: number[] = [];
    for (let i = range.start; i <= range.end; i++) {
      if (predicate(i)) {
        invalidInRange.push(i);
      }
    }
    return [...acc, ...invalidInRange];
  }, []);
}

function isInvalidId(id: number): boolean {
  const stringId = id.toString();
  const firstHalf = stringId.slice(0, stringId.length / 2);
  const secondHalf = stringId.slice(stringId.length / 2);
  return firstHalf === secondHalf;
}

function isInvalidIdTwo(id: number): boolean {
  const stringId = id.toString();
  for (let n = Math.floor(stringId.length / 2); n >= 1; n--) {
    if (stringId.length % n !== 0) {
      continue;
    }
    const chunks = chunk(stringId.split(''), n);
    if (chunks.every(chunk => chunk.join('') === chunks[0].join(''))) {
      return true;
    }
  }
  return false;
}

function parseRanges(input: string): Range[] {
  const rangeStrings = input.split(',');
  return rangeStrings.map(rangeString => {
    const [start, end] = rangeString.split('-').map(Number);
    return { start, end };
  });
}

type Range = {
  start: number;
  end: number;
};

main();
