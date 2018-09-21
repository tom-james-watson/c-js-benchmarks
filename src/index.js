import {Bubblesort, ArrayReverse, Fibonacci} from './benchmarks'

let selectedBenchmark

const benchmarks = {
  arrayreverse: ArrayReverse,
  bubblesort: Bubblesort,
  fibonacci: Fibonacci
}

function run(fn) {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  const duration = end - start

  return [result, duration]
}

async function runBenchmark() {

  document.getElementById("run").disabled = true
  document.getElementById("run").innerHTML = '...'
  document.getElementById("c-result").innerHTML = '...'
  document.getElementById("js-result").innerHTML = '...'

  setTimeout(() => {
    const Benchmark = benchmarks[selectedBenchmark]

    const args = {}
    for (const arg of Object.keys(Benchmark.args)) {
      args[arg] = Number(document.getElementById(arg).value)
    }

    const benchmark = new Benchmark(args)

    const [cResult, cDuration] = run(benchmark.c.bind(benchmark))
    const [jsResult, jsDuration] = run(benchmark.js.bind(benchmark))

    if (!benchmark.compare(cResult, jsResult)) {
      alert('Test failed - results not equal')
    }

    document.getElementById("c-result").innerHTML = `${Math.round(cDuration)}ms`
    document.getElementById("js-result").innerHTML = `${Math.round(jsDuration)}ms`

    document.getElementById("run").disabled = false
    document.getElementById("run").innerHTML = 'Run'
  }, 100)

}

function changeEventHandler(ev) {
  setBenchmark(ev.target.value)
}

function setBenchmark(benchmark) {
  selectedBenchmark = benchmark
  const Benchmark = benchmarks[benchmark]

  let argsHtml = ''
  const args = {}

  for (const argName of Object.keys(Benchmark.args)) {
    const arg = Benchmark.args[argName]
    argsHtml += `
      <div>
        <label for="${argName}">${argName}</label>
        <input id="${argName}" type="number" value="${arg.default}" min="${arg.min}" max="${arg.max}" />
      </div>
    `
  }

  document.getElementById("args").innerHTML = argsHtml

  document.getElementById("c-link").href = Benchmark.links.c
  document.getElementById("js-link").href = Benchmark.links.js
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("run").addEventListener("click", runBenchmark)
  document.getElementById("benchmark").onchange = changeEventHandler
  setBenchmark(document.getElementById("benchmark").value)
})
