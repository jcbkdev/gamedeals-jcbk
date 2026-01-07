export function extendArray(arr: any[], n: number) {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  const len = arr.length;

  for (let i = 0; i < n; i++) {
    // Use modulo (%) to wrap around to the start if i >= length
    result.push(arr[i % len]);
  }

  return result;
}
