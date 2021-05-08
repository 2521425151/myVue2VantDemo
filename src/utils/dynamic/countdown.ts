export const countdown = (name: string, that: any) => {
  that[name]--
  setTimeout(() => {
    if (that[name] > 0) {
      countdown(name, that)
    }
  }, 1000)
}
