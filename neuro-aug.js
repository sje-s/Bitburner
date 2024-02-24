/** Start any relevent upkeep scripts, purchase a set number of an augmentation, then install the augmentations and run this script */
export async function main(ns) {
  var fact = "Sector-12"
  ns.disableLog("sleep")
  if (ns.getHostname() == "home") {
    var servSize = 2048
    while (ns.getPurchasedServerCost(servSize) >= ns.getServerMoneyAvailable("home")) {
      await ns.sleep(0)
    }
    await ns.exec("server-upgrade.js", "home", 1, servSize)
    while (!ns.scan("home").includes("cct")) {
      await ns.sleep(0)
    }
    await ns.exec("copy-cct.js", "home", 1, "cct")
    await ns.exec("neuro-aug.js", "cct")
    ns.scriptKill("neuro-aug.js", "home")
  } else {
    await ns.singularity.purchaseTor()
    var progs = ns.singularity.getDarkwebPrograms()
    for (var i = 0; i < progs.length; i++) {
      var cos = ns.singularity.getDarkwebProgramCost(progs[i])
      if (cos <= ns.getServerMoneyAvailable("home")) {
        await ns.singularity.purchaseProgram(progs[i])
      }
    }
    // ns.exec("stockTix.js", "cct")
    await ns.exec("gang-reg.js", "cct")
    await ns.exec("company-reg.js", "cct")
    await ns.exec("copy-script.js", "home")
    await ns.exec("quick-nuke.js", "cct")
    await ns.exec("copy-run.js", "home")

    while (!ns.singularity.checkFactionInvitations().includes(fact)) {
      await ns.sleep(0)
    }
    await ns.singularity.joinFaction(fact)
    await ns.singularity.workForFaction(fact, "hacking", false)

    await ns.sleep(1000)

    await ns.sleep(9000)
    await ns.exec("copy-run.js", "cct")

    var num = buy_neuro(ns, fact)
    while (num < 5) {
      await ns.sleep(0)
      var aug = "NeuroFlux Governor"
      if ((ns.singularity.getAugmentationPrice(aug) <= ns.getServerMoneyAvailable("home")) && (ns.singularity.getFactionRep(fact) >= ns.singularity.getAugmentationRepReq(aug))) {
        ns.singularity.purchaseAugmentation(fact, aug)
        num++
      } else if (ns.singularity.getFactionRep(fact) <= ns.singularity.getAugmentationRepReq(aug)) {
        ns.singularity.donateToFaction(fact, ns.getServerMoneyAvailable("home") - ns.singularity.getAugmentationPrice(aug))
      }
    }
    ns.singularity.installAugmentations("neuro-aug.js")
  }
}

/** Buy the "NueroFlux Governor" augmentation as many times as is possible with the current funds, then end the function */
function buy_neuro(ns, fact) {
  var aug = "NeuroFlux Governor"
  ns.disableLog("sleep")
  var bought = 0
  while (true) {
    if ((ns.singularity.getAugmentationPrice(aug) <= ns.getServerMoneyAvailable("home")) && (ns.singularity.getFactionRep(fact) >= ns.singularity.getAugmentationRepReq(aug))) {
      ns.singularity.purchaseAugmentation(fact, aug)
      bought++
    } else {
      ns.tprint("Bought Neuro")
      return bought
    }
  }
}