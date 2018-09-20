export default function(array, size) {
  const result = Uint8Array.from({length: size})

  for (let i = size - 1; i >= 0; i--) {
    result[size - (i + 1)] = array[i];
  }

  return result;
}
