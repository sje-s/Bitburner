/** Buy tea and throw parties to regulate employee energy/morale */
export async function main(ns) {
  ns.disableLog("sleep")
  while(true) {
    await ns.sleep(0)
    var corp = ns.corporation.getCorporation()
    var divs = corp["divisions"]

    for (var i = 0; i < divs.length; i++) {
      var div = ns.corporation.getDivision(divs[i])
      var cities = div["cities"]
      for (var j = 0; j < cities.length; j++) { 
        var office = ns.corporation.getOffice(div["name"], cities[j])
        if (office["maxEnergy"] - 2 > office["avgEnergy"]) {
          ns.corporation.buyTea(divs[i], cities[j])
        }
        if (office["maxMorale"] - 1 > office["avgMorale"]) {
          ns.corporation.throwParty(divs[i], cities[j], 100000)
        }
      }
    }
  }
}