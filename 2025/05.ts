async function main() {
  const input = await Bun.file('05-input.txt').text();
  const {ingredients, ranges} = parseInput(input);
  console.log(partOne(ingredients, ranges));
}

function partOne(ingredients: number[], ranges: NumericRange[]): number {
  return ingredients.filter(ingredient => 
    isFresh(ingredient, ranges)
  ).length;
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
