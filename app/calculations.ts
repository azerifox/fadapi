export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // minimum inclusive, maximum exclusive
  return Math.floor(Math.random() * (max - min) + min);
}
