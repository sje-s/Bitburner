/** Purchase "cct" server and upgrade the storage available */
export async function main(ns) {
  ns.purchaseServer("cct", 2)
  while (ns.getServerMaxRam("cct") < 1024) {
    ns.upgradePurchasedServer("cct", ns.getServerMaxRam("cct") * 2)
    await ns.sleep(0)
  }
}