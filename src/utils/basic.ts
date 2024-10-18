export function getLastDigitOfSum(pana: string): string {
  if (pana === '***') return '*';
  const sum = pana
    .split('')
    .map(Number)
    .reduce((acc, digit) => acc + digit, 0);
  return (sum % 10).toString();
}
