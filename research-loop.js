/** Fully upgrade research for a division */
export async function main(ns) {
  ns.disableLog("sleep")
  var divName = ns.args[0]
  var rsrch = ["Hi-Tech R&D Laboratory", "Market-TA.I", "Market-TA.II", "uPgrade: Fulcrum", "uPgrade: Capacity.I", "uPgrade: Capacity.II", "Drones", "Drones - Transport", "Drones - Assembly", "Self-Correcting Assemblers", "Overclock", "Sti.mu", "Automatic Drug Administration", "Go-Juice", "CPH4 Injections", "AutoPartyManager", "AutoBrew"]

  var i = 0
  while (i < rsrch.length) {
    await ns.sleep(0)
    if (ns.corporation.hasResearched(divName, rsrch[i])) {
      i++
      continue
    }
    div = ns.corporation.getDivision(divName)
    if (!div["makesProducts"]) {
      if ((i > 2) && (i < 6)) {
        i++
        continue
      }
      var amount = ns.corporation.getResearchCost(div["name"], rsrch[i])
    } else {
      if (rsrch[i] == "Hi-Tech R&D Laboratory") {
        var amount = ns.corporation.getResearchCost(div["name"], rsrch[i])
      } else {
        var amount = 2*ns.corporation.getResearchCost(div["name"], rsrch[i])
      }
    }

    if (amount <= div["researchPoints"]) {
      ns.corporation.research(divName, rsrch[i])
      if (rsrch[i] == "Market-TA.I") {
        if (div["type"] == "Agriculture") {
          var cities = div["cities"]
          for (var j = 0; j < cities.length; j++) {
            ns.corporation.setMaterialMarketTA1(div["name"], cities[j], "Food", true)
            ns.corporation.setMaterialMarketTA1(div["name"], cities[j], "Plants", true)
          }
        } else {
          var corp = ns.corporation.getCorporation()
          var divs = corp["divisions"]
          for (var k = 0; k < divs.length; k++) {
            var div = ns.corporation.getDivision(divs[i])
            if (div["type"] != "Agriculture") {
              var cities = div["cities"]
              for (var j = 0; j < cities.length; j++) {
                ns.corporation.setMaterialMarketTA1(div["name"], cities[j], "Drugs", true)
              }
              var prod = div["products"]
              for (var j = 0; j < prod.length; j++) {
                if (ns.corporation.getProduct(div["name"], "Sector-12", prod[j])["developmentProgress"] == 100) {
                  ns.corporation.setProductMarketTA1(div["name"], prod[j], true)
                }
              }
            }
          }
        }
      }

      if (rsrch[i] == "Market-TA.II") {
        if (div["type"] == "Agriculture") {
          var cities = div["cities"]
          for (var j = 0; j < cities.length; j++) {
            ns.corporation.setMaterialMarketTA2(div["name"], cities[j], "Food", true)
            ns.corporation.setMaterialMarketTA2(div["name"], cities[j], "Plants", true)
          }
        } else {
          var corp = ns.corporation.getCorporation()
          var divs = corp["divisions"]
          for (var k = 0; k < divs.length; k++) {
            var div = ns.corporation.getDivision(divName)
            if (div["type"] != "Agriculture") {
              var cities = div["cities"]
              for (var j = 0; j < cities.length; j++) {
                ns.corporation.setMaterialMarketTA2(div["name"], cities[j], "Drugs", true)
              }
              var prod = div["products"]
              for (var j = 0; j < prod.length; j++) {
                if (ns.corporation.getProduct(div["name"], "Sector-12", prod[j])["developmentProgress"] == 100) {
                  ns.corporation.setProductMarketTA2(div["name"], prod[j], true)
                }
              }
            }
          }
        }
      }
      i++
    }
  }
}