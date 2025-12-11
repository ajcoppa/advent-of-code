export function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  } else {
    console.log(`√ - ${message}`);
  }
}

export function chunk<A>(list: A[], chunkSize: number): A[][] {
  const chunks: A[][] = [];
  for (let i = 0; i < list.length; i += chunkSize) {
    const chunk = list.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}

export function sum(list: number[]): number {
  return list.reduce((a, b) => a + b, 0);
}

export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}
