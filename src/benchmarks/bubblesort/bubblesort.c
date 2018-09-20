#include <stdint.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
void bubblesort(uint8_t *array, int size)
{
  int i, j, temp;

  for (i = 0; i < size; i++)
  {
    for (j = 0; j < size - 1; j++)
    {
      if (array[j + 1] < array[j])
      {
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
}
