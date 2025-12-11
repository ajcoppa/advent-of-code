import { sum } from './lib';

async function main() {
  const input = await Bun.file('03-input.txt').text();
  const joltages = parseJoltages(input);
  console.log(partOne(joltages));
}

function partOne(joltages: number[][]): number {
  return sum(joltages.map(maxJoltageBruteForce));
}

function maxJoltageBruteForce(bank: number[]): number {
  const possibilities: number[] = [];
  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const n = bank[i] * 10 + bank[j];
      possibilities.push(n);
    }
  }
  return Math.max(...possibilities);
}

function parseJoltages(input: string): number[][] {
  return input.split('\n').map(line => line.split('').map(Number));
}

main();
