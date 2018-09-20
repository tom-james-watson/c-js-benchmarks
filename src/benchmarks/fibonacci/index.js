import jsFibonacci from './fibonacci'

export default class Fibonacci {

  static get args() {
    return {
      number: {
        default: 40,
        min: 1,
        max: 46
      },
      iterations: {
        default: 1000000,
        min: 1,
        max: 100000000
      }
    }
  }

  static get links() { return {
    c: 'https://github.com/tom-james-watson/c-js-benchmarks/blob/master/src/benchmarks/fibonacci/fibonacci.c',
    js: 'https://github.com/tom-james-watson/c-js-benchmarks/blob/master/src/benchmarks/fibonacci/fibonacci.js'
  }}

  constructor(args) {
    this.iterations = args.iterations
    this.number = args.number
  }

  c() {
    return Module.ccall(
      'fibonacci',
      'number',
      ['number', 'number'],
      [this.number, this.iterations]
    )
  }

  js() {
    return jsFibonacci(this.number, this.iterations)
  }

  compare(cResult, jsResult) {
    console.log(cResult)
    return cResult === jsResult
  }

}
