#include <stdint.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
void array_reverse(uint8_t *array, int size, uint8_t *target) {
  for (int i = size - 1; i >= 0; i--) {
    target[size - (i + 1)] = array[i];
  }
}
