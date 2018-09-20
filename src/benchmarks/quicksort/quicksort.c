#include <stdlib.h>
#include <stdint.h>
#include <emscripten.h>

int cmpfunc (const void * a, const void * b) {
  return ( *(uint8_t*)a - *(uint8_t*)b );
}

EMSCRIPTEN_KEEPALIVE
void quicksort(uint8_t *array, int size) {
  qsort(array, size, sizeof(uint8_t), cmpfunc);
}
