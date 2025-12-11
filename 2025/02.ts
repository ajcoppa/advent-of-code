async function main() {
  const input = await Bun.file('02-input.txt').text();
  const ranges = parseRanges(input);
  console.log(partOne(ranges));
}

function partOne(ranges: Range[]): number {
  const invalidIds: number[] = ranges.reduce((acc: number[], range: Range) => {
    const invalidInRange: number[] = [];
    for (let i = range.start; i <= range.end; i++) {
      if (isInvalidId(i)) {
        invalidInRange.push(i);
      }
    }
    return [...acc, ...invalidInRange];
  }, []);
  return invalidIds.reduce((a, b) => a + b, 0);
}

function isInvalidId(id: number): boolean {
  const stringId = id.toString();
  const firstHalf = stringId.slice(0, stringId.length / 2);
  const secondHalf = stringId.slice(stringId.length / 2);
  return firstHalf === secondHalf;
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
