import { Grid } from "../lib/Coord";

async function main() {
  const input = await Bun.file('07-input.txt').text();
  const grid = parseGrid(input);
  console.log(partOne(grid));
}

function partOne(grid: Grid<Tile>): number {
  let splits = 0;
  while (highestRowIndexWithoutBeamsOrStart(grid) !== grid.length - 1) {
    splits += tick(grid);
  }
  return splits;
}

function tick(grid: Grid<Tile>): number {
  let splits = 0;
  const y = highestRowIndexWithoutBeamsOrStart(grid);
  const xs = previousRowPositionsWithBeamsOrStart(grid, y);
  xs.forEach((x) => {
    const tileBelow = grid[y][x];
    if (tileBelow._type === "Splitter") {
      splits++;
      if (x > 0) grid[y][x-1]._type = "Beam";
      if (x < grid[y].length) grid[y][x+1]._type = "Beam";
    } else {
      tileBelow._type = "Beam";
    }
  });
  return splits;
}

function highestRowIndexWithoutBeamsOrStart(grid: Grid<Tile>): number {
  return grid.findIndex((row) =>
    row.every((tile) => !["Start", "Beam"].includes(tile._type))
  );
}

function previousRowPositionsWithBeamsOrStart(grid: Grid<Tile>, y: number): number[] {
  return grid[y-1].map((tile, x) =>
    ["Start", "Beam"].includes(tile._type) ? [x] : []
  ).flat();
}

function parseGrid(input: string): Grid<Tile> {
  return input.split("\n").map(line => line.split("").map(strToTile));
}

function strToTile(str: string): Tile {
  switch (str) {
    case "S": return { _type: "Start" };
    case "^": return { _type: "Splitter"};
    case ".": return { _type: "Empty"};
    case "|": return { _type: "Beam"};
  }
  throw new Error(`Invalid tile ${str}`);
}

function tileToStr(tile: Tile): string {
  switch (tile._type) {
    case "Start": return "S";
    case "Splitter": return "^";
    case "Beam": return "|";
    case "Empty": return ".";
  }
}

function printGrid(grid: Grid<Tile>) {
  grid.forEach(row => {
    console.log(row.map(tileToStr).join(""));
  });
}

interface Start { _type: "Start"; }
interface Splitter { _type: "Splitter"; }
interface Beam { _type: "Beam"; }
interface Empty { _type: "Empty"; }

const empty = { _type: "Empty" };

type Tile = Start | Splitter | Beam | Empty;

main();
