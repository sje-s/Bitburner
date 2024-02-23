/** Iterative phases of expansion and hiring */
export async function main(ns) {
    var cities = ["Sector-12", "Aevum", "Volhaven", "Chongqing", "New Tokyo", "Ishima"]
    var div = "Agri-vision"
    ns.disableLog("sleep")
    var wait = 30
    wait *= 1000
    
    //Expand to all cities
    for (var i = 0; i < cities.length; i++) {
      if (cities[i] != "Sector-12") {
        ns.corporation.expandCity(div, cities[i])
        ns.corporation.purchaseWarehouse(div, cities[i])
      }
      ns.corporation.setSmartSupply(div, cities[i], true)
      ns.corporation.sellMaterial(div, cities[i], "Plants", "MAX", "MP")
      ns.corporation.sellMaterial(div, cities[i], "Food", "MAX", "MP")
      ns.corporation.hireEmployee(div, cities[i], "Operations")
      ns.corporation.hireEmployee(div, cities[i], "Engineer")
      ns.corporation.hireEmployee(div, cities[i], "Business")
    }
  
    //Upgrade Offices in each city
    for (var i = 0; i < cities.length; i++) {
      while (ns.corporation.getCorporation()["funds"] < ns.corporation.getOfficeSizeUpgradeCost(div, cities[i], 3)) {
        await ns.sleep(0)
      }
      ns.corporation.upgradeOfficeSize(div, cities[i], 3)
      ns.corporation.hireEmployee(div, cities[i], "Engineer")
      ns.corporation.hireEmployee(div, cities[i], "Business")
      ns.corporation.hireEmployee(div, cities[i], "Management")
    }
    ns.corporation.getMaterialData("Food")
  
    //Buy Upgrades
    var upgrades = ["DreamSense", "Smart Factories", "FocusWires", "Neural Accelerators", "Speech Processor Implants", "Nuoptimal Nootropic Injector Implants"]
    for (var j = 0; j < 2; j++) {
      for (var i = 0; i < upgrades.length; i++) {
        var up = upgrades[i]
        while(ns.corporation.getCorporation()["funds"] < ns.corporation.getUpgradeLevelCost(up)) {
          await ns.sleep(0)
        }
        ns.corporation.levelUpgrade(up)
      }
    }
  
    //Buy Export Capabilities
    while (ns.corporation.getCorporation()["funds"] < ns.corporation.getUnlockCost("Export")) {
      await ns.sleep(0)
    }
    ns.corporation.purchaseUnlock("Export")
  
    //Purchase Real Estate, AI Cores, and Hardware
    var warCap = 300
    var matsAq = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]]
    var mats = ["Real Estate", "AI Cores", "Hardware"]
    var matAm = [27000, 75, 125]
    var cont = true
    var cheapTown = ""
  
    //Find if Materials have already been Purchased
    for (var i = 0; i < cities.length; i++) {
      for (var j = 0; j < mats.length; j++) {
        if (parseInt(ns.corporation.getMaterial(div, cities[i], mats[j])["stored"].toFixed(0)) == matAm[j]) {
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
  
    //Purchase Upgrades and Upgrade Warehouse as is needed
    while (cont) {
      await ns.sleep(0)
  
      var aq = false
      if (ns.corporation.getCorporation()["state"] == "EXPORT") {
        for (var i = 0; i < cities.length; i++) {
          for (var j = 0; j < mats.length; j++) {
            var stor = parseInt(ns.corporation.getMaterial(div, cities[i], mats[j])["stored"].toFixed(0))
            var war = ns.corporation.getWarehouse(div, cities[i])
            if ((!matsAq[i][j]) && ((ns.corporation.getMaterialData(mats[j])["size"] * (matAm[j] - stor)) < (war["size"] - (parseInt(war["sizeUsed"].toFixed(0)) + 1)))) {
              aq = true
              if (mats[j] != "Real Estate") {
                var targetCity = cities[i]
              } else {
                var targetCity = cheapTown
              }
              if (ns.corporation.getCorporation()["funds"] > (ns.corporation.getMaterial(div, targetCity, mats[j])["marketPrice"] * (matAm[j] - stor))) {
                if (mats[j] != "Real Estate") {
                  ns.corporation.bulkPurchase(div, cities[i], mats[j], (matAm[j] - stor))
                } else {
                  if ((ns.corporation.getMaterialData(mats[j])["size"] * (matAm[j] - stor)) > (ns.corporation.getWarehouse(div, cheapTown)["size"] - (parseInt(ns.corporation.getWarehouse(div, cheapTown)["sizeUsed"].toFixed(0)) + 1))) {
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
                    while (ns.corporation.getCorporation()["state"] == "EXPORT") {
                      await ns.sleep(0)
                    }
                    while (ns.corporation.getCorporation()["state"] != "EXPORT") {
                      await ns.sleep(0)
                    }
                    while (ns.corporation.getCorporation()["state"] == "EXPORT") {
                      await ns.sleep(0)
                    }
                    ns.corporation.cancelExportMaterial(div, cheapTown, div, cities[i], "Real Estate")
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
          for (var i = 0; i < cities.length; i++) {
            if ((parseInt(ns.corporation.getWarehouse(div, cities[i])["size"].toFixed(0)) < warCap) && (ns.corporation.getCorporation()["funds"] > ns.corporation.getUpgradeWarehouseCost(div, cities[i]))) {
              ns.corporation.upgradeWarehouse(div, cities[i])
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
  
    //Upgrade Storage and Selling Power as is Appropriate (Important?)
    for (var i = 0; i < cities.length; i++) {
      ns.tprint("New City: " + cities[i])
      var cont = true
      while (cont) {
        cont = false
        var start = 0
        var stateCheck = true
  
        //Upgrade Selling Power
        while (start < 3) {
          if ((stateCheck) && (ns.corporation.getCorporation()["state"] == "START")) {
            stateCheck = false
            start++
            var mat1 = ns.corporation.getMaterial(div, cities[i], "Food")
            var mat2 = ns.corporation.getMaterial(div, cities[i], "Plants")
            if ((parseInt((mat1["productionAmount"] - mat1["actualSellAmount"]).toFixed(1)) > 0) || (parseInt((mat2["productionAmount"] - mat2["actualSellAmount"]).toFixed(1)) > 0)) {
              ns.tprint("mat")
              if (ns.corporation.getHireAdVertCost(div) < ns.corporation.getOfficeSizeUpgradeCost(div, cities[i], 3)) {
                while (ns.corporation.getCorporation()["funds"] < ns.corporation.getHireAdVertCost(div)) {
                  await ns.sleep(0)
                }
                ns.corporation.hireAdVert(div)
              }else {
                while (ns.corporation.getCorporation()["funds"] < ns.corporation.getOfficeSizeUpgradeCost(div, cities[i], 3)) {
                  await ns.sleep(0)
                }
                ns.corporation.upgradeOfficeSize(div, cities[i], 3)
                ns.corporation.hireEmployee(div, cities[i], "Business")
                ns.corporation.hireEmployee(div, cities[i], "Business")
                ns.corporation.hireEmployee(div, cities[i], "Business")
              } 
              cont = true
              await ns.sleep(15000)
              break
            }
          } else if (ns.corporation.getCorporation()["state"] != "START"){
            stateCheck = true
          }
          await ns.sleep(0)
        }
  
        //Upgrade Smart Storage
        start = 0
        while ((start < 3) && (!cont)) {
          if ((stateCheck) && (ns.corporation.getCorporation()["state"] == "START")) {
            start++
          } else if (ns.corporation.getCorporation()["state"] != "START"){
            stateCheck = true
          }
          var war = ns.corporation.getWarehouse(div, cities[i])
          if (war["size"] <= (parseInt(war["sizeUsed"].toFixed(0)) + 1)) {
            ns.tprint("war")
            while (ns.corporation.getCorporation()["funds"] < ns.corporation.getUpgradeLevelCost("Smart Storage")) {
              await ns.sleep(0)
            }
            ns.corporation.levelUpgrade("Smart Storage")
            cont = true
            await ns.sleep(1000)
            break
          }
          await ns.sleep(0)
        }
        await ns.sleep(0)
      }
    }
  
    //Upgrade Offices for Research (Important?)
    for (var i = 0; i < cities.length; i++) {
      while (ns.corporation.getCorporation()["funds"] < ns.corporation.getOfficeSizeUpgradeCost(div, cities[i], 3)) {
        await ns.sleep(0)
      }
      ns.corporation.upgradeOfficeSize(div, cities[i], 3)
      ns.corporation.hireEmployee(div, cities[i], "Research & Development")
      ns.corporation.hireEmployee(div, cities[i], "Research & Development")
      ns.corporation.hireEmployee(div, cities[i], "Research & Development")
    }
  
    //Buy Smart Factory Upgrades  
    while (ns.corporation.getUpgradeLevel("Smart Factories") < 10) {
      while (ns.corporation.getCorporation()["funds"] < ns.corporation.getUpgradeLevelCost("Smart Factories")) {
        await ns.sleep(0)
      }
      ns.corporation.levelUpgrade("Smart Factories")
    }
    //Buy Smart Storage Upgrades
    while (ns.corporation.getUpgradeLevel("Smart Storage") < 10) {
      while (ns.corporation.getCorporation()["funds"] < ns.corporation.getUpgradeLevelCost("Smart Storage")) {
        await ns.sleep(0)
      }
      ns.corporation.levelUpgrade("Smart Storage")
    }
  
    //Buy Next Iteration of Capital Upgrades
    //Same as Above
    var warCap = 2000
    var matsAq = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]]
    var mats = ["Real Estate", "AI Cores", "Hardware", "Robots"]
    var matAm = [146400, 2520, 2800, 96]
    var cont = true
  
    //Find if Materials have already been Purchased
    for (var i = 0; i < cities.length; i++) {
      for (var j = 0; j < mats.length; j++) {
        if (parseInt(ns.corporation.getMaterial(div, cities[i], mats[j])["stored"].toFixed(0)) == matAm[j]) {
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
  
    //Purchase Upgrades and Upgrade Warehouse as is needed
    while (cont) {
      await ns.sleep(0)
  
      var aq = false
      if (ns.corporation.getCorporation()["state"] == "EXPORT") {
        for (var i = 0; i < cities.length; i++) {
          for (var j = 0; j < mats.length; j++) {
            var stor = parseInt(ns.corporation.getMaterial(div, cities[i], mats[j])["stored"].toFixed(0))
            var war = ns.corporation.getWarehouse(div, cities[i])
            if ((!matsAq[i][j]) && ((ns.corporation.getMaterialData(mats[j])["size"] * (matAm[j] - stor)) < (war["size"] - (parseInt(war["sizeUsed"].toFixed(0)) + 1)))) {
              aq = true
              ns.print(cities[i] + " " + mats[j] + " aq=true")
              if (mats[j] != "Real Estate") {
                var targetCity = cities[i]
              } else {
                var targetCity = cheapTown
              }
              if (ns.corporation.getCorporation()["funds"] > (ns.corporation.getMaterial(div, targetCity, mats[j])["marketPrice"] * (matAm[j] - stor))) {
                if (mats[j] != "Real Estate") {
                  ns.corporation.bulkPurchase(div, cities[i], mats[j], (matAm[j] - stor))
                } else {
                  if ((ns.corporation.getMaterialData(mats[j])["size"] * (matAm[j] - stor)) > (ns.corporation.getWarehouse(div, cheapTown)["size"] - (parseInt(ns.corporation.getWarehouse(div, cheapTown)["sizeUsed"].toFixed(0)) + 1))) {
                    aq = false
                    ns.print("Need more Vol Storage")
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
                    while (ns.corporation.getCorporation()["state"] == "EXPORT") {
                      await ns.sleep(0)
                    }
                    while (ns.corporation.getCorporation()["state"] != "EXPORT") {
                      await ns.sleep(0)
                    }
                    while (ns.corporation.getCorporation()["state"] == "EXPORT") {
                      await ns.sleep(0)
                    }
                    ns.corporation.cancelExportMaterial(div, cheapTown, div, cities[i], "Real Estate")
                  }
                }
                matsAq[i][j] = true
                await ns.sleep(2000)
                break
              } else {
                ns.print("Need Funds")
              }
            }
          }
        }
  
        if (!aq) {
          ns.print("Upgradeing Warehouse")
          for (var i = 0; i < cities.length; i++) {
            if ((parseInt(ns.corporation.getWarehouse(div, cities[i])["size"].toFixed(0)) < warCap) && (ns.corporation.getCorporation()["funds"] > ns.corporation.getUpgradeWarehouseCost(div, cities[i]))) {
              ns.corporation.upgradeWarehouse(div, cities[i])
            } else {
              ns.print("Need Warehouse Funds " + cities[i])
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
  
    //Expand to Pharmaceuticals
    while (ns.corporation.getCorporation()["funds"] < 200100000000) {
      await ns.sleep(0)
    }
    div = "Pharma-vision-1"
    ns.corporation.expandIndustry("Pharmaceutical", div)
    ns.run("research-loop.js", 1, div)
    ns.corporation.hireEmployee(div, "Sector-12", "Operations")
    ns.corporation.hireEmployee(div, "Sector-12", "Engineer")
    ns.corporation.hireEmployee(div, "Sector-12", "Business")
    ns.corporation.setSmartSupply(div, "Sector-12", true)
    ns.corporation.sellMaterial(div, "Sector-12", "Drugs", "MAX", "MP")
    while (ns.corporation.getCorporation()["funds"] < 2100000000) {
      await ns.sleep(0)
    }
    ns.corporation.makeProduct(div, "Sector-12", "Strain-1", 1000000000, 1000000000)
    ns.run("product-creation.js")
  
    //Hire Operations, Engineers, Business
    for (var i = 0; i < 5; i++) {
      while (ns.corporation.getCorporation()["funds"] < (ns.corporation.getOfficeSizeUpgradeCost(div, "Sector-12", 3) + 100000000)) {
        await ns.sleep(0)
      }
      ns.corporation.upgradeOfficeSize(div, "Sector-12", 3)
      ns.corporation.hireEmployee(div, "Sector-12", "Operations")
      ns.corporation.hireEmployee(div, "Sector-12", "Engineer")
      ns.corporation.hireEmployee(div, "Sector-12", "Business")
    }
    
    //Hire R&D
    for (var i = 0; i < 2; i++) {
      while (ns.corporation.getCorporation()["funds"] < (ns.corporation.getOfficeSizeUpgradeCost(div, "Sector-12", 3) + 100000000)) {
        await ns.sleep(0)
      }
      ns.corporation.upgradeOfficeSize(div, "Sector-12", 3)
      ns.corporation.hireEmployee(div, "Sector-12", "Research & Development")
      ns.corporation.hireEmployee(div, "Sector-12", "Research & Development")
      ns.corporation.hireEmployee(div, "Sector-12", "Research & Development")
    }
    
    //Hire Management
    for (var i = 0; i < 2; i++) {
      while (ns.corporation.getCorporation()["funds"] < (ns.corporation.getOfficeSizeUpgradeCost(div, "Sector-12", 3) + 100000000)) {
        await ns.sleep(0)
      }
      ns.corporation.upgradeOfficeSize(div, "Sector-12", 3)
      ns.corporation.hireEmployee(div, "Sector-12", "Management")
      ns.corporation.hireEmployee(div, "Sector-12", "Management")
      ns.corporation.hireEmployee(div, "Sector-12", "Management")
    }
  
    //Buy Next Iteration of Capital Upgrades - Agriculture
    //Same as Above
    var div = "Agri-vision"
    var warCap = 3800
    var matsAq = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]]
    var mats = ["Real Estate", "AI Cores", "Hardware", "Robots"]
    var matAm = [230400, 6270, 9300, 726]
    var cont = true
    var cheapTown = ""
  
    //Find if Materials have already been Purchased
    for (var i = 0; i < cities.length; i++) {
      for (var j = 0; j < mats.length; j++) {
        if (parseInt(ns.corporation.getMaterial(div, cities[i], mats[j])["stored"].toFixed(0)) == matAm[j]) {
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
  
    //Purchase Upgrades and Upgrade Warehouse as is needed
    while (cont) {
      await ns.sleep(0)
  
      var aq = false
      if (ns.corporation.getCorporation()["state"] == "EXPORT") {
        for (var i = 0; i < cities.length; i++) {
          for (var j = 0; j < mats.length; j++) {
            var stor = parseInt(ns.corporation.getMaterial(div, cities[i], mats[j])["stored"].toFixed(0))
            var war = ns.corporation.getWarehouse(div, cities[i])
            if ((!matsAq[i][j]) && ((ns.corporation.getMaterialData(mats[j])["size"] * (matAm[j] - stor)) < (war["size"] - (parseInt(war["sizeUsed"].toFixed(0)) + 1)))) {
              aq = true
              ns.print(cities[i] + " " + mats[j] + " aq=true")
              if (mats[j] != "Real Estate") {
                var targetCity = cities[i]
              } else {
                var targetCity = cheapTown
              }
              if (ns.corporation.getCorporation()["funds"] > (ns.corporation.getMaterial(div, targetCity, mats[j])["marketPrice"] * (matAm[j] - stor))) {
                if (mats[j] != "Real Estate") {
                  ns.corporation.bulkPurchase(div, cities[i], mats[j], (matAm[j] - stor))
                } else {
                  if ((ns.corporation.getMaterialData(mats[j])["size"] * (matAm[j] - stor)) > (ns.corporation.getWarehouse(div, cheapTown)["size"] - (parseInt(ns.corporation.getWarehouse(div, cheapTown)["sizeUsed"].toFixed(0)) + 1))) {
                    aq = false
                    ns.print("Need more Vol Storage")
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
                    while (ns.corporation.getCorporation()["state"] == "EXPORT") {
                      await ns.sleep(0)
                    }
                    while (ns.corporation.getCorporation()["state"] != "EXPORT") {
                      await ns.sleep(0)
                    }
                    while (ns.corporation.getCorporation()["state"] == "EXPORT") {
                      await ns.sleep(0)
                    }
                    ns.corporation.cancelExportMaterial(div, cheapTown, div, cities[i], "Real Estate")
                  }
                }
                matsAq[i][j] = true
                await ns.sleep(2000)
                break
              } else {
                ns.print("Need Funds")
              }
            }
          }
        }
  
        if (!aq) {
          ns.print("Upgradeing Warehouse")
          for (var i = 0; i < cities.length; i++) {
            if ((parseInt(ns.corporation.getWarehouse(div, cities[i])["size"].toFixed(0)) < warCap) && (ns.corporation.getCorporation()["funds"] > ns.corporation.getUpgradeWarehouseCost(div, cities[i]))) {
              ns.corporation.upgradeWarehouse(div, cities[i])
            } else {
              ns.print("Need Warehouse Funds " + cities[i])
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
  
    
    div = "Pharma-vision-1"
    var bil = 1000000000
    
    //Expand to all Cities
    for (var i = 1; i < cities.length; i++) {
      while (ns.corporation.getCorporation()["funds"] < (9*bil + parseInt(bil/10))) {
        await ns.sleep(0)
      }
      if (i > 1) {
        ns.corporation.expandCity(div, cities[i])
        ns.corporation.purchaseWarehouse(div, cities[i])
        ns.corporation.hireEmployee(div, cities[i], "Operations")
        ns.corporation.hireEmployee(div, cities[i], "Engineer")
        ns.corporation.hireEmployee(div, cities[i], "Business")
      }
      if (ns.corporation.hasResearched(div, "Market-TA.II")) {
        ns.corporation.setMaterialMarketTA2(div, cities[i], "Drugs", true)
        var prod = ns.corporation.getDivision(div)["products"]
        for (var j = 0; j < prod.length; j++) {
          if (ns.corporation.getProduct(div, "Sector-12", prod[j])["developmentProgress"] == 100) {
            ns.corporation.setProductMarketTA2(div, prod[j], true)
          }
        }
      } else if (ns.corporation.hasResearched(div, "Market-TA.I")) {
        ns.corporation.setMaterialMarketTA1(div, cities[i], "Drugs", true)
        var prod = ns.corporation.getDivision(div)["products"]
        for (var j = 0; j < prod.length; j++) {
          if (ns.corporation.getProduct(div, "Sector-12", prod[j])["developmentProgress"] == 100) {
            ns.corporation.setProductMarketTA1(div, prod[j], true)
          }
        }
      } else {
        ns.corporation.sellMaterial(div, cities[i], "Drugs", "MAX", "MP")
        var prod = ns.corporation.getDivision(div)["products"]
        for (var j = 0; j < prod.length; j++) {
          if (ns.corporation.getProduct(div, "Sector-12", prod[j])["developmentProgress"] == 100) {
            ns.corporation.sellProduct(div, cities[i], prod[j], "MAX", "MP", true)
          }
        }
      }
    }
  
    //Expand Number of Employees (Except Sector-12)
    var check = true
    while (check) {
      await ns.sleep(0)
      check = false
      for (var i = 1; i < cities.length; i++) {
        if ((ns.corporation.getOffice(div, cities[i])["numEmployees"] < 15) && (ns.corporation.getCorporation()["funds"] > ns.corporation.getOfficeSizeUpgradeCost(div, cities[i], 3))) {
          if (ns.corporation.getOffice(div, cities[i])["numEmployees"] < 9) {
            ns.corporation.upgradeOfficeSize(div, cities[i], 3)
            ns.corporation.hireEmployee(div, cities[i], "Operations")
            ns.corporation.hireEmployee(div, cities[i], "Engineer")
            ns.corporation.hireEmployee(div, cities[i], "Business")
          } else if (ns.corporation.getOffice(div, cities[i])["numEmployees"] < 12) {
            ns.corporation.upgradeOfficeSize(div, cities[i], 3)
            ns.corporation.hireEmployee(div, cities[i], "Research & Development")
            ns.corporation.hireEmployee(div, cities[i], "Research & Development")
            ns.corporation.hireEmployee(div, cities[i], "Research & Development")
          } else {
            ns.corporation.upgradeOfficeSize(div, cities[i], 3)
            ns.corporation.hireEmployee(div, cities[i], "Management")
            ns.corporation.hireEmployee(div, cities[i], "Management")
            ns.corporation.hireEmployee(div, cities[i], "Management")
          }
        }
      }
  
      for (var i = 1; i < cities.length; i++) {
        check = check || (ns.corporation.getOffice(div, cities[i])["numEmployees"] < 15)
      }
    }
  
    //Purchase Upgrades
    var upgrades = ["DreamSense", "Project Insight", "Smart Factories", "Smart Storage", "ABC SalesBots", "Neural Accelerators", "FocusWires", "Nuoptimal Nootropic Injector Implants", "Speech Processor Implants"]
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < upgrades.length; j++) {
        if (((upgrades[j] == "DreamSense") || (upgrades[j] == "Project Insight")) && (ns.corporation.getUpgradeLevel(upgrades[j]) >= 10)) {
          continue
        }
        if (ns.corporation.getUpgradeLevel(upgrades[j]) < 20) {
          while (ns.corporation.getCorporation()["funds"] < ns.corporation.getUpgradeLevelCost(upgrades[j])) {
            await ns.sleep(0)
          }
          ns.corporation.levelUpgrade(upgrades[j])
          ns.print(upgrades[j])
        }
      }
    }
  
    var up = "Wilson Analytics"
    for (var i = 0; i < (3 - ns.corporation.getUpgradeLevel(up)); i++) {
      while (ns.corporation.getCorporation()["funds"] < ns.corporation.getUpgradeLevelCost(up)) {
        await ns.sleep(0)
      }
      ns.corporation.levelUpgrade(up)
      ns.print(up)
    }
  }