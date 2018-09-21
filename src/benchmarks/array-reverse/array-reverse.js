export default function(array, size, target) {
  for (let i = size - 1; i >= 0; i--) {
    target[size - (i + 1)] = array[i];
  }
}
