/** Corporation startup/creation script */
export async function main(ns) {
    ns.disableLog("sleep")
    while(ns.getServerMoneyAvailable["home"] < 150000000000) {
      ns.sleep(0)
    }
  
    // TODO: check if corporation exists
    ns.corporation.createCorporation("The Horde", true)
    ns.corporation.expandIndustry("Agriculture", "Agri-vision")
    ns.run("research-loop.js", 1, "Agri-vision")
    ns.corporation.purchaseUnlock("Smart Supply")
    ns.spawn("corp-phase-1.js")
}
  
// TODO: export to city with best price