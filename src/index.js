import {Quicksort, ArrayReverse} from './benchmarks'

let selectedBenchmark = 'quicksort'

const benchmarks = {
  quicksort: Quicksort,
  arrayreverse: ArrayReverse
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

    document.getElementById("c-result").innerHTML = `${cDuration}ms`
    document.getElementById("js-result").innerHTML = `${jsDuration}ms`

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
        <input id="${argName}" type="number" value="${arg.default}" min="${arg.min}" max=${arg.max}" />
      </div>
    `
  }

  document.getElementById("args").innerHTML = argsHtml
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("run").addEventListener("click", runBenchmark)
  document.getElementById("benchmark").onchange = changeEventHandler
  setBenchmark('quicksort')
})
