/** Cyclically gains money ('hacks') and experience ('grows' or 'weakens') on the current server */
export async function main(ns) {
  var mode = "hack"
  var host = ns.args[0]
  while (true) {
    for (var i = 0; i < 100; i++) {
      await ns.hack(host);
    }
    for (var i = 0; i < 5; i++) {
      await ns.weaken(host)
      await ns.weaken(host)
      await ns.weaken(host)
      await ns.grow(host)
    }
  }
}