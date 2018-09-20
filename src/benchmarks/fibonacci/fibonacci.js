export default function(n) {
  let a = 1
  let b = 1
  let tmp = 0

  while (n > 1) {
    tmp = b
    b += a
    a = tmp
    --n
  }

  return a
}
