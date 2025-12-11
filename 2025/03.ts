import { range, sum } from './lib';

async function main() {
  const input = await Bun.file('03-input.txt').text();
  const joltages = parseJoltages(input);
  console.log(partOne(joltages));
  console.log(partTwo(joltages));
}

function partOne(joltages: number[][]): number {
  return sum(joltages.map(joltage => maxJoltageNDigits(joltage, 2)));
}

function partTwo(joltages: number[][]): number {
  return sum(joltages.map(joltage => maxJoltageNDigits(joltage, 12)));
}

function maxJoltageNDigits(bank: number[], digits: number): number {
  let nextDigitIndex = 0, maxJoltage = 0;
  for (let digit = 0; digit < digits; digit++) {
    const endDigitIndex = bank.length - (digits - digit - 1);
    const possibleDigitIndexes = range(nextDigitIndex, endDigitIndex);
    const maxDigitIndex = possibleDigitIndexes.reduce((acc, cur) => {
      return bank[cur] > bank[acc] ? cur : acc;
    }, nextDigitIndex);
    nextDigitIndex = maxDigitIndex + 1;
    maxJoltage = maxJoltage * 10 + bank[maxDigitIndex];
  }
  return maxJoltage;
}

function parseJoltages(input: string): number[][] {
  return input.split('\n').map(line => line.split('').map(Number));
}

main();
