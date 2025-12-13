import { product, sum } from "../lib";
import { transpose } from "../lib/Coord";

async function main() {
  const input = await Bun.file('06-input.txt').text();
  const parseOne = parseProblemsOne(input);
  console.log(process(parseOne.operands, parseOne.operators));
  const parseTwo = parseProblemsTwo(input);
  console.log(process(parseTwo.operands, parseTwo.operators));
}

function process(operands: number[][], operators: string[]): number {
  return sum(operators.map((operator, i) => {
    const combiner = operator === "+" ? sum : product;
    return combiner(operands[i]);
  }));
}

function parseProblemsOne(input: string) {
  const lines = input.split("\n");
  const operands = transpose(lines.slice(0, lines.length - 1).map(line => 
    line.split(" ").filter(str => !!str).map(Number)
  ));
  const operators = lines[lines.length - 1].split(" ").filter(str => !!str);
  return {operands, operators};
}

function parseProblemsTwo(input: string) {
  const lines = input.split("\n");
  const operandLines = lines.slice(0, lines.length - 1);
  const baseOperands = operandLines.map(line => 
    line.split("").filter(str => !!str)
  ).reverse();
  const operands = transpose(baseOperands).reverse().map(x =>
    x.reverse().join("")
  ).reduce((acc: number[][], cur: string) => 
    cur.trim().length === 0 ?
      // String of all spaces -> start a new grouping
      acc.concat([[]]) :
      // Otherwise, add the parsed number version to the last grouping
      [...acc.slice(0, acc.length - 1), acc[acc.length - 1].concat([Number(cur)])]
  , [[]]);

  const operators = lines[lines.length - 1].split(" ").filter(str => !!str).reverse();
  return {operands, operators};
}

main();
