import { Coord, getAdjacentCoords, Grid } from "../lib/Coord";

async function main() {
  const input = await Bun.file('04-input.txt').text();
  const grid = parseGrid(input);
  console.log(partOne(grid));
}

function partOne(grid: Grid<Tile>): number {
  return grid.map((row, y) =>
    row.filter((tile, x) =>
      tile === Tile.PaperRoll && coordIsAccessible(grid, {x, y})
    )
  ).flat().length;
}

function coordIsAccessible(grid: Grid<Tile>, coord: Coord): boolean {
  return getAdjacentCoords(grid, coord, true).filter(c => 
    grid[c.y][c.x] === Tile.PaperRoll
  ).length < 4;
}

function parseGrid(input: string): Grid<Tile> {
  return input.split("\n").map(row => row.split("").map(tileStr => 
    tileStr === "@" ? Tile.PaperRoll : Tile.Empty
  ));
}

function printGrid(grid: Grid<Tile>) {
  grid.forEach(row => {
    console.log(row.map(tileToString).join(""));
  });
}

function tileToString(tile: Tile): string {
  return tile === Tile.PaperRoll ? "@" : ".";
}

enum Tile {
  PaperRoll,
  Empty
};

main();
