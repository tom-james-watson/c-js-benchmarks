BENCHMARKS=src/benchmarks
EMCC=emcc
EMCCFLAGS=-O2 -s WASM=1 -s NO_EXIT_RUNTIME=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall"]' -s ASSERTIONS=1

ARRAY_REVERSE=$(BENCHMARKS)/array-reverse/array-reverse.c
QUICKSORT=$(BENCHMARKS)/quicksort/quicksort.c
FIBONACCI=$(BENCHMARKS)/fibonacci/fibonacci.c

dist/c-funcs.js: $(ARRAY_REVERSE) $(QUICKSORT) $(FIBONACCI)
	$(EMCC) $(EMCCFLAGS) $(ARRAY_REVERSE) $(QUICKSORT) $(FIBONACCI) -o dist/c-funcs.js

clean:
	rm -rf dist/c-funcs*
