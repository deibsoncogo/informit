export function NumberRandomInteger(min = 1111111111, max = 9999999999): string {
  const numberRandomDecimal = Math.random() * (max - min) + min

  const numberRandomInteger = numberRandomDecimal.toFixed(0)

  return numberRandomInteger
}
