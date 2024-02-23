/** Upgrade Production multiplier materials */
//TODO: fix exporting from cheapest city to all other cities
export async function main(ns) {
  ns.disableLog("sleep")
  var cities = ["Sector-12", "Aevum", "Volhaven", "Chongqing", "New Tokyo", "Ishima"]
  var div = "Pharma-vision-1"

  for (var p = 0; p < 10; p++) {
    ns.tprint(p)
    var warCapInit = 8000
    var matsAq = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]]
    var mats = ["Real Estate", "AI Cores", "Hardware", "Robots"]
    var matAmInit = [1000000, 10000, 10000, 1000]
    var cont = true
    var cheapTown = ""
    var warCap = warCapInit * (p + 1)
    var matAm = matAmInit.map(function(x) { return x * (p + 1); });

    //Find if Materials have already been Purchased
    for (var i = 0; i < cities.length; i++) {
      for (var j = 0; j < mats.length; j++) {
        if (parseInt(ns.corporation.getMaterial(div, cities[i], mats[j])["stored"].toFixed(0)) >= matAm[j]) {
          matsAq[i][j] = true
        }
      }
    }
    
    //Find Cheapest Town to Buy Real Estate in
    var least = Infinity
    for (var i = 0; i < cities.length; i++) {
      if (ns.corporation.getMaterial(div, cities[i], "Real Estate")["marketPrice"] < least) {
        least = ns.corporation.getMaterial(div, cities[i], "Real Estate")["marketPrice"]
        cheapTown = cities[i]
      }
    }
    ns.tprint(cheapTown)

    while (cont) {
      await ns.sleep(0)

      var aq = false
      while (ns.corporation.getCorporation()["state"] != "EXPORT") {
        await ns.sleep(0)
      }
      if (ns.corporation.getCorporation()["state"] == "EXPORT") {
        aq = true
        var reset = false
        for (var i = 0; i < cities.length; i++) {
          for (var j = 0; j < mats.length; j++) {
            var stor = parseInt(ns.corporation.getMaterial(div, cities[i], mats[j])["stored"].toFixed(0))
            var war = ns.corporation.getWarehouse(div, cities[i])
            if (mats[j] == "Real Estate") {
              var targetCity = cheapTown
            } else {
              var targetCity = cities[i]
            }
            
            if ((!reset) && (!matsAq[i][j]) && ((ns.corporation.getMaterialData(mats[j])["size"] * (matAm[j] - stor)) < (war["size"] - (parseInt(war["sizeUsed"].toFixed(0)) + 1)))) {
              if (ns.corporation.getCorporation()["funds"] > (ns.corporation.getMaterial(div, targetCity, mats[j])["marketPrice"] * (matAm[j] - stor))) {
                if (mats[j] != "Real Estate") {
                  ns.corporation.bulkPurchase(div, cities[i], mats[j], (matAm[j] - stor))
                } else {
                  if (((ns.corporation.getMaterialData(mats[j])["size"] * (matAm[j] - stor)) > (ns.corporation.getWarehouse(div, cheapTown)["size"] - (parseInt(ns.corporation.getWarehouse(div, cheapTown)["sizeUsed"].toFixed(0)) + 1))) || ((ns.corporation.getMaterialData(mats[j])["size"] * (matAm[j] - stor)) > (ns.corporation.getWarehouse(div, cities[i])["size"] - (parseInt(ns.corporation.getWarehouse(div, cities[i])["sizeUsed"].toFixed(0)) + 1)))) {
                    aq = false
                  } else if (cities[i] == cheapTown) {
                    var by = true
                    for (var k = 0; k < cities.length; k++) {
                      if (k != i) {
                        by = by && matsAq[k][j]
                      }
                    }
                    if (by) {
                      ns.corporation.bulkPurchase(div, cities[i], mats[j], (matAm[j] - stor))
                    }
                  } else {
                    var exst = parseInt(ns.corporation.getMaterial(div, cheapTown, mats[j])["stored"].toFixed(0))
                    ns.corporation.bulkPurchase(div, cheapTown, mats[j], (matAm[j] - stor))
                    ns.corporation.exportMaterial(div, cheapTown, div, cities[i], "Real Estate", "(EINV-" + exst + ")/10")
                    while (parseInt(ns.corporation.getMaterial(div, cheapTown, mats[j])["stored"].toFixed(0)) > exst) {
                      await ns.sleep(0)
                    }
                    ns.corporation.cancelExportMaterial(div, cheapTown, div, cities[i], "Real Estate")
                    reset = true
                  }
                }
                matsAq[i][j] = true
                await ns.sleep(2000)
                break
              }
            }
          }
        }

        if (!aq) {
          var size = parseInt(ns.corporation.getWarehouse(div, cities[0])["size"].toFixed(0))
          var same = true
          for (var i = 1; i < cities.length; i++) {
            same = same && (parseInt(ns.corporation.getWarehouse(div, cities[i])["size"].toFixed(0)) == size)
          }
          for (var i = 0; i < cities.length; i++) {
            if (((ns.corporation.getUpgradeWarehouseCost(div, cities[i]) * 6) < ns.corporation.getUpgradeLevelCost("Smart Storage")) || (!same)) {
              if ((parseInt(ns.corporation.getWarehouse(div, cities[i])["size"].toFixed(0)) < warCap) && (ns.corporation.getCorporation()["funds"] > ns.corporation.getUpgradeWarehouseCost(div, cities[i]))) {
                ns.corporation.upgradeWarehouse(div, cities[i])
              }
            } else {
              if ((parseInt(ns.corporation.getWarehouse(div, cities[i])["size"].toFixed(0)) < warCap) && (ns.corporation.getCorporation()["funds"] > ns.corporation.getUpgradeLevelCost("Smart Storage"))) {
                ns.corporation.levelUpgrade("Smart Storage")
              }
            }
          }
        }
      }

      cont = false
      for (var i = 0; i < cities.length; i++) {
        if (parseInt(ns.corporation.getWarehouse(div, cities[i])["size"].toFixed(0)) < warCap) {
          cont = true
          break
        }

        for (var j = 0; j < mats.length; j++) {
          cont = (cont || !matsAq[i][j])
        }
        if (cont) {
          break
        }
      }
    }
  }
}