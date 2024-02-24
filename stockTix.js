/** Monitor and purchase stocks */
export async function main(ns) {
  ns.disableLog("sleep")
  ns.disableLog("getServerMoneyAvailable")
  var tot = 0
  var symbs = ns.stock.getSymbols()
  while(true) {
    await ns.sleep(1)
    for (var i = 0; i < symbs.length; i++) {
      var temp = ns.stock.getForecast(symbs[i])
      if (temp > .60) {
        var maxA = ns.getServerMoneyAvailable("home")/ns.stock.getAskPrice(symbs[i])
        var maxS = ns.stock.getMaxShares(symbs[i])
        if ((maxA > 100000) && (ns.stock.getPosition(symbs[i])[0] == 0)) {
          if (maxS < maxA) {
            tot += (maxS * ns.stock.buyStock(symbs[i], maxS))
            ns.run("stockSeller.js", 1, symbs[i], maxS)
          } else if (maxA >= 200000) {
            tot += (Math.ceil(3* maxA/4) * ns.stock.buyStock(symbs[i], Math.ceil(3 * maxA/4)))
            ns.run("stockSeller.js", 1, symbs[i], Math.ceil(3 * maxA/4))
          } else {
            tot += (100000 * ns.stock.buyStock(symbs[i], 100000))
            ns.run("stockSeller.js", 1, symbs[i], 100000)
          }
        }
      }
    }
  }
}