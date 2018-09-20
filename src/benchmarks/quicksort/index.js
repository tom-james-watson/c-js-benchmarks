export default class Quicksort {

  static get MAX_VALUE() { return 255; }

  static get args() {
    return {
      size: {
        default: 5000,
        min: 1,
        max: 10000
      },
      iterations: {
        default: 50,
        min: 1,
        max: 10000000
      }
    }
  }

  constructor(args) {
    this.iterations = args.iterations
    this.size = args.size
    this.values = Uint8Array.from(
      {length: this.size},
      () => Math.floor(Math.random() * Quicksort.MAX_VALUE)
    )
  }

  c() {
    let result

    for (let i = 0; i < this.iterations; i++) {
      const newValues = this.values.slice(0)

      const buffer = Module._malloc(newValues.length)
      Module.HEAPU8.set(newValues, buffer)

      Module.ccall(
        'quicksort',
        'number',
        ['number', 'number'],
        [buffer, newValues.length]
      )

      result = Module.HEAPU8.subarray(buffer, buffer + newValues.length)

      Module._free(buffer)
    }

    return result
  }

  js() {
    let result

    for (let i = 0; i < this.iterations; i++) {
      const newValues = this.values.slice(0)
      result = newValues.sort((a, b) => a - b)
    }

    return result
  }

  jsQuickSort(unSortedArray) {
    var tempStack = [unSortedArray];
    var sortedArray = [];


    while(tempStack.length) {
      var tempVar = tempStack.pop();
      var currentLength = tempVar.length;

      if(currentLength == 1) {
        sortedArray.push(tempVar[0]);
        continue;
      }

      var pivotElement = tempVar[0];
      var leftElement = [];
      var rightElement = [];

      for (var iter=1; iter < currentLength; iter++) {
        if(tempVar[iter] < pivotElement) {
          leftElement.push(tempVar[iter]);
        } else {
          rightElement.push(tempVar[iter]);
        }
      }

      leftElement.push(pivotElement);

      if(rightElement.length)
        tempStack.push(rightElement);
      if(leftElement.length)
        tempStack.push(leftElement);
    }

    return sortedArray;
  }

  compare(cResult, jsResult) {
    if (cResult.length !== jsResult.length) {
      return false
    }

    for (let i = 0; i < cResult.length; i++) {
      if (cResult[i] !== jsResult[i]) {
        return false
      }
    }

    return true
  }

}
