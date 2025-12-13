import { sum, removeElem } from "../lib";

async function main() {
  const input = await Bun.file('05-input.txt').text();
  const {ingredients, ranges} = parseInput(input);
  console.log(partOne(ingredients, ranges));
  console.log(partTwo(ingredients, ranges));
}

function partOne(ingredients: number[], ranges: NumericRange[]): number {
  return ingredients.filter(ingredient => 
    isFresh(ingredient, ranges)
  ).length;
}

function partTwo(ingredients: number[], ranges: NumericRange[]): number {
  let startRangeLength;
  do {
    startRangeLength = ranges.length;
    for (let i = 0; i < ranges.length; i++) {
      for (let j = i + 1; j < ranges.length; j++) {
        const r1 = ranges[i], r2 = ranges[j];
        if (whollyIncludedIn(r1, r2)) {
          ranges = removeElem(ranges, i);
        } else if (whollyIncludedIn(r2, r1)) {
          ranges = removeElem(ranges, j);
        } else if (overlaps(r1, r2)) {
          // Remove both, with j - 1 to account for removal of ranges[i]
          ranges = removeElem(ranges, i);
          ranges = removeElem(ranges, j - 1);
          // Add new range combining both
          const newRange = {
            start: Math.min(r1.start, r2.start),
            end: Math.max(r1.end, r2.end)
          };
          ranges.push(newRange);
        }
      }
    }
  // Repeat until no longer changing to catch any overlap with replaced/new ranges
  } while (ranges.length < startRangeLength);

  return sum(ranges.map(range => range.end - range.start + 1));
}

function whollyIncludedIn(r1: NumericRange, r2: NumericRange): boolean {
  return r1.start >= r2.start && r1.end <= r2.end;
}

function overlaps(r1: NumericRange, r2: NumericRange): boolean {
  return (r1.end >= r2.start && r1.start <= r2.start) || 
         (r2.end >= r1.start && r2.start <= r1.start);
}

function isFresh(ingredient: number, ranges: NumericRange[]): boolean {
  return ranges.some(range => range.start <= ingredient && range.end >= ingredient);
}

function parseInput(input: string): {
  ranges: NumericRange[],
  ingredients: number[]
} {
  const [rangeStrings, ingredientStrings] = input.split("\n\n");
  const ranges = rangeStrings.split("\n").map(rangeStr => {
    const [start, end] = rangeStr.split("-").map(Number);
    return {start, end};
  });
  const ingredients = ingredientStrings.split("\n").map(Number);
  return {ranges, ingredients};
}

type NumericRange = {
  start: number;
  end: number;
};

main();
