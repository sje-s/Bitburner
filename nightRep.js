/** 'Work' for different 'factions' until 'reputation' hits a maximum for each 'faction', then move on to the next 'faction' */
export async function main(ns) {
  var facts = ns.getPlayer().factions
  var factDict = {}
  for (var i = 0; i < facts.length; i++) {
    var augs = ns.singularity.getAugmentationsFromFaction(facts[i])
    var temp = 0
    for (var j = 0; j < augs.length; j++) {
      if (ns.singularity.getAugmentationRepReq(augs[j]) > temp) {
        temp = ns.singularity.getAugmentationRepReq(augs[j])
      }
    }
    factDict[facts[i]] = temp
  }

  for (var i = 0; i < facts.length; i++) {
    try {
      ns.singularity.workForFaction(facts[i],"hacking", false)
    } catch {
      try {
        ns.singularity.workForFaction(facts[i], "security", false)
      } catch {
        ns.singularity.workForFaction(facts[i], "field", false)
      }
    }

    while (ns.singularity.getFactionRep(facts[i]) < factDict[facts[i]]) {
      await ns.sleep(0)
    }
  }
}