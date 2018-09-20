function fib(n) {
  let a = 1
  let b = 1
  let tmp = 0

  while (n > 1) {
    tmp = b
    b += a
    a = tmp
    --n
  }

  return a
}

export default function(n, iterations) {
  let result

  for (let i = 0; i < iterations; i++) {
    result = fib(n);
  }

  return result;
}
