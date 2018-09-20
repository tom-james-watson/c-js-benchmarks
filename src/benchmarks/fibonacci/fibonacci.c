#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
long int fibonacci(n)
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
