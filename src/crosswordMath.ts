

// Cantor: https://codepen.io/LiamKarlMitchell/pen/xnEca
export const cantorPair = (x: number, y: number): number => {
  return ((x + y) * (x + y + 1)) / 2 + y;
}

export const reverseCantorPair = function (z: number): [number, number] {
  let pair: number[] = [];
  let t = Math.floor((-1 + Math.sqrt(1 + 8 * z)) / 2);
  let x = t * (t + 3) / 2 - z;
  let y = z - t * (t + 1) / 2;
  return [x, y]
}