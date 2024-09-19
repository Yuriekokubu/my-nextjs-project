export function commaNumber(value: number): string {
	const [integerPart, decimalPart] = value.toFixed(2).split(".");
  
	const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	return `${withCommas}.${decimalPart}`;
}
