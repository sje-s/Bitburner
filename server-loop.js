/** Upgrade server space until the available space is at least the target number */
export async function main(ns) {
  ns.disableLog("sleep")
  var target = ns.args[0]
  if (target == undefined) {
    target = 2048
  }
  while (ns.getServerMaxRam(ns.getHostname()) < target) {
    ns.upgradePurchasedServer(ns.getHostname(), ns.getServerMaxRam(ns.getHostname()) * 2)
    await ns.sleep(0)
  }
  
  ns.spawn("startupCCT.js")
}