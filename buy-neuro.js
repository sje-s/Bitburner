/** Buy the "NueroFlux Governor" augmentation as many times as is possible with the current funds, then end the program */
export async function main(ns) {
  var fact = ns.args[0]
  var aug = "NeuroFlux Governor"
  ns.disableLog("sleep")
  var count = 0
  while (true) {
    await ns.sleep(0)
    if ((ns.singularity.getAugmentationPrice(aug) <= ns.getServerMoneyAvailable("home")) && (ns.singularity.getFactionRep(fact) >= ns.singularity.getAugmentationRepReq(aug))) {
      ns.singularity.purchaseAugmentation(fact, aug)
      count++
    } else {
      ns.tprint("Bought Neuro: " + count)
      return
    }
  }
}