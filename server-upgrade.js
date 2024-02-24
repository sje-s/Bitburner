/** Check funds and purchase 'cct' server (WIP) */
export async function main(ns) {
  // ns.tprint(ns.getPurchasedServerUpgradeCost("cct", 4096))
  // ns.upgradePurchasedServer("cct", 2048)
  var servSize = ns.args[0]
  ns.tprint(ns.getPurchasedServerCost(servSize))
  ns.purchaseServer("cct", servSize)
}