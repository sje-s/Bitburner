/** Join and then work for the 'Daedalus faction' (the final faction) */
export async function main(ns) {
  while (true) {
    var facts = ns.singularity.checkFactionInvitations()
    for (var i = 0; i < facts.length; i++) {
      if (facts[i] == "Daedalus") {
        ns.singularity.joinFaction("Daedalus")
        try {
          ns.singularity.workForFaction("Daedalus","hacking")
        } catch {
          try {
            ns.singularity.workForFaction("Daedalus", "security")
          } catch {
            ns.singularity.workForFaction("Daedalus", "field")
          }
        }
        return
      }
    }
    ns.disableLog("sleep")
    await ns.sleep(60000)
  }
}