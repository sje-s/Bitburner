/** Hire employees and expand industy (Test File) */
export async function main(ns) {
    ns.disableLog("sleep")
  
    var cities = ["Sector-12", "Aevum", "Volhaven", "Chongqing", "New Tokyo", "Ishima"]
    // var div = "Pharma-vision-1"
    var upgrades = ["Wilson Analytics", "DreamSense", "Project Insight", "Smart Factories", "Smart Storage", "ABC SalesBots", "Neural Accelerators", "FocusWires", "Nuoptimal Nootropic Injector Implants", "Speech Processor Implants"]
    var divs = ns.corporation.getCorporation()["divisions"]
  
    while(true) {
      await ns.sleep(0)
      for (var i = 0; i < divs.length; i++) {
        var div = ns.corporation.getDivision(divs[i])
        var cities = div["cities"]
        for (var j = 0; j < cities.length; j++) { 
          if (div["type"] == "Pharmaceutical") {
            //Upgrade Upgrades
            if (ns.corporation.getUpgradeWarehouseCost(div["name"], cities[j]) * 1000 < ns.corporation.getCorporation()["funds"]) {
              ns.corporation.upgradeWarehouse(div["name"], cities[j])
            } else {
              for (var k = 0; k < upgrades.length; k++) {
                if (ns.corporation.getUpgradeLevelCost(upgrades[k]) * 1000 < ns.corporation.getCorporation()["funds"]) {
                  ns.corporation.getUpgradeLevel(upgrades[k])
                }
              }
            }
  
              
            //Upgrade Advertising, then Sector-12, then other offices
            if (cities[j] == "Sector-12") {
              if (ns.corporation.getHireAdVertCost(div["name"]) < ns.corporation.getOfficeSizeUpgradeCost(div["name"], cities[j], 15)) {
                if (ns.corporation.getHireAdVertCost(div["name"]) < ns.corporation.getCorporation()["funds"]) {
                  ns.corporation.hireAdVert(div["name"])
                }
              } else {
                if (ns.corporation.getOfficeSizeUpgradeCost(div["name"], cities[j], 15) < ns.corporation.getCorporation()["funds"]) {
                  ns.corporation.upgradeOfficeSize(div["name"], cities[j], 15)
                  for (var k = 0; k < 3; k++) {
                    ns.corporation.hireEmployee(div["name"], cities[j], "Operations")
                    ns.corporation.hireEmployee(div["name"], cities[j], "Engineer")
                    ns.corporation.hireEmployee(div["name"], cities[j], "Business")
                    ns.corporation.hireEmployee(div["name"], cities[j], "Management")
                    ns.corporation.hireEmployee(div["name"], cities[j], "Research & Development")
                  }
                }
              }
            } else if (ns.corporation.getOffice(div["name"], cities[j])["size"] + 60 < (ns.corporation.getOffice(div["name"], "Sector-12")["size"])) {
              if (ns.corporation.getHireAdVertCost(div["name"]) < ns.corporation.getOfficeSizeUpgradeCost(div["name"], cities[j], 15)) {
                if (ns.corporation.getHireAdVertCost(div["name"]) < ns.corporation.getCorporation()["funds"]) {
                  ns.corporation.hireAdVert(div["name"])
                }
              } else {
                if (ns.corporation.getOfficeSizeUpgradeCost(div["name"], cities[j], 15) < ns.corporation.getCorporation()["funds"]) {
                  ns.corporation.upgradeOfficeSize(div["name"], cities[j], 15)
                  for (var k = 0; k < 3; k++) {
                    ns.corporation.hireEmployee(div["name"], cities[j], "Operations")
                    ns.corporation.hireEmployee(div["name"], cities[j], "Engineer")
                    ns.corporation.hireEmployee(div["name"], cities[j], "Business")
                    ns.corporation.hireEmployee(div["name"], cities[j], "Management")
                    ns.corporation.hireEmployee(div["name"], cities[j], "Research & Development")
                  }
                }
              }
            }
          }
        }
      }
  
      //Pharmaceutical Expansion
      if ((divs.length < 20) && (ns.corporation.getCorporation()["funds"] >= 100000000000000)) {
        var name = "Pharma-vision-" + divs.length
        ns.corporation.expandIndustry("Pharmaceutical", name)
        var cits = ["Sector-12", "Aevum", "Volhaven", "Chongqing", "New Tokyo", "Ishima"]
        ns.corporation.upgradeOfficeSize(name, "Sector-12", 12)
        for (var i = 1; i < cits.length; i++) {
          ns.corporation.expandCity(name, cits[i])
          ns.corporation.purchaseWarehouse(name, cits[i])
          ns.corporation.upgradeOfficeSize(name, cits[i], 12)
        }
        
        for (var i = 0; i < cits.length; i++) {
          ns.corporation.upgradeWarehouse(name, cits[i], 50)
  
          for (var k = 0; k < 3; k++) {
            ns.corporation.hireEmployee(name, cits[i], "Operations")
            ns.corporation.hireEmployee(name, cits[i], "Engineer")
            ns.corporation.hireEmployee(name, cits[i], "Business")
            ns.corporation.hireEmployee(name, cits[i], "Management")
            ns.corporation.hireEmployee(name, cits[i], "Research & Development")
          }
  
          ns.corporation.sellMaterial(name, cits[i], "Drugs", "MAX", "MP")
          if (ns.corporation.hasResearched(name, "Market-TA.II")) {
            ns.corporation.setMaterialMarketTA2(name, cits[i], "Drugs", true)
          }
  
          ns.corporation.bulkPurchase(name, cits[i], "Hardware", 100000)
          ns.corporation.bulkPurchase(name, cits[i], "Robots", 10000)
          ns.corporation.bulkPurchase(name, cits[i], "AI Cores", 100000)
          ns.corporation.bulkPurchase(name, cits[i], "Real Estate", 10000000)
        }
      }
    }
  }