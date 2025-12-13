import { Coord, Grid } from "../lib/Coord";

async function main() {
  const input = await Bun.file('07-input.txt').text();
  const grid = parseGrid(input);
  const gridTwo = parseGrid(input);
  console.log(partOne(grid));
  console.log(partTwo(gridTwo));
}

function partOne(grid: Grid<Tile>): number {
  let splits = 0;
  while (highestRowIndexWithoutBeamsOrStart(grid) !== grid.length - 1) {
    splits += tick(grid);
  }
  return splits;
}

function partTwo(grid: Grid<Tile>): number {
  const startX = grid[0].findIndex(tile => tile._type === "Start");
  return possiblePathsStartingAt(grid, {x: startX, y: 1});
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

let pathsFor: number[][] = [[]];

function possiblePathsStartingAt(grid: Grid<Tile>, start: Coord): number {
  // Base case, exited grid
  if (start.x < 0 || start.x >= grid[0].length || start.y >= grid.length) {
    return 1;
  }

  // Previously calculated
  if (pathsFor[start.y] && pathsFor[start.y][start.x]) return pathsFor[start.y][start.x];

  const tile = grid[start.y][start.x];
  let paths = 0;
  if (tile._type === "Empty") {
    paths = possiblePathsStartingAt(grid, {x: start.x, y: start.y + 1});
  } else if (tile._type === "Splitter") {
    paths = possiblePathsStartingAt(grid, {x: start.x - 1, y: start.y + 1}) +
            possiblePathsStartingAt(grid, {x: start.x + 1, y: start.y + 1});
  } else {
    paths = 0;
  }

  if (!pathsFor[start.y]) pathsFor[start.y] = [];
  pathsFor[start.y][start.x] = paths;
  return paths;
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
