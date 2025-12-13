import { product, sum } from "../lib";
import { transpose } from "../lib/Coord";

async function main() {
  const input = await Bun.file('06-input.txt').text();
  const {operands, operators} = parseProblems(input);
  console.log(partOne(operands, operators));
}

function partOne(operands: number[][], operators: string[]): number {
  const transposedOperands = transpose(operands);
  return sum(operators.map((operator, i) => {
    const combiner = operator === "+" ? sum : product;
    return combiner(transposedOperands[i]);
  }));
}

function parseProblems(input: string) {
  const lines = input.split("\n");
  const operands = lines.slice(0, lines.length - 1).map(line => 
    line.split(" ").filter(str => !!str).map(Number)
  );
  const operators = lines[lines.length - 1].split(" ").filter(str => !!str);
  return {operands, operators};
}

main();
