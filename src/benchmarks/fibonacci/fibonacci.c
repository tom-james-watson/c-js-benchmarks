#include <emscripten.h>

long int fib(n)
{
  long int a = 1;
  long int b = 1;
  long int tmp = 0;

  while (n > 1)
  {
    tmp = b;
    b += a;
    a = tmp;
    --n;
  }

  return a;
}

EMSCRIPTEN_KEEPALIVE
long int fibonacci(n, iterations) {
  int result;

  for (int i = 0; i < iterations; i++)
  {
    result = fib(n);
  }

  return result;
}
