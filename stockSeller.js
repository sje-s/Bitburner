/** Sell stocks (which have already been purchased) */
export async function main(ns) {
  ns.disableLog("sleep")
  var held = true
  while (held) {
    var temp = ns.stock.getForecast(ns.args[0])
    if (temp < .50) {
      ns.stock.sellStock(ns.args[0], ns.args[1])
      held = false
    }

    await ns.sleep(1)
  }
}