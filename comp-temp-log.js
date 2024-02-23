/** Repository of functioning code that isn't being used anymore */
export async function main(ns) {
    ns.disableLog("sleep")
    await(ns.sleep(0))
    while(true) {
      var corp = ns.corporation.getCorporation()
  
      var divs = corp["divisions"]
  
      for (var i = 0; i < divs.length; i++) {
        var div = ns.corporation.getDivision(divs[i])
        var cities = div["cities"]
        for (var j = 0; j < cities.length; j++) { 
          // var office = ns.corporation.getOffice(div["name"], cities[j])
          // if (office["maxEnergy"] - 2 > office["avgEnergy"]) {
          //   ns.corporation.buyTea(divs[i], cities[j])
          // }
          // if (office["maxMorale"] - 10 > office["avgMorale"]) {
          //   ns.corporation.throwParty(divs[i], cities[j], 1000000)
          // }
  
          // HEALTHCARE UPGRADES MAINTENANCE LOOP
          /*
          if (div["type"] == "Pharmaceutical") {
            var wh = ns.corporation.getWarehouse(div["name"], cities[j])
            if (ns.corporation.getUpgradeWarehouseCost(div["name"], cities[j]) * 1000 < corp["funds"]) {
              ns.corporation.upgradeWarehouse(div["name"], cities[j])
            } else if (ns.corporation.getUpgradeLevelCost("Smart Storage") * 1000 < corp["funds"]) {
              ns.corporation.getUpgradeLevel("Smart Storage")
            }
              
            if (cities[j] == "Sector-12") {
              if (ns.corporation.getHireAdVertCost(div["name"]) < ns.corporation.getOfficeSizeUpgradeCost(div["name"], cities[j], 15)) {
                if (ns.corporation.getHireAdVertCost(div["name"]) < corp["funds"]) {
                  ns.corporation.hireAdVert(div["name"])
                }
              } else {
                if (ns.corporation.getOfficeSizeUpgradeCost(div["name"], cities[j], 15) < corp["funds"]) {
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
            } else if (office["size"] + 60 < (ns.corporation.getOffice(div["name"], "Sector-12")["size"])) {
              if (ns.corporation.getHireAdVertCost(div["name"]) < ns.corporation.getOfficeSizeUpgradeCost(div["name"], cities[j], 15)) {
                if (ns.corporation.getHireAdVertCost(div["name"]) < corp["funds"]) {
                  ns.corporation.hireAdVert(div["name"])
                }
              } else {
                if (ns.corporation.getOfficeSizeUpgradeCost(div["name"], cities[j], 15) < corp["funds"]) {
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
          */
        }
  
        // HIRE ADVERTISING LOOP
        //
  
        if ((!ns.corporation.hasResearched(div["name"], "Hi-Tech R&D Laboratory")) && (ns.corporation.getResearchCost(div["name"], "Hi-Tech R&D Laboratory") <= div["researchPoints"])) {
          ns.corporation.research(div["name"], "Hi-Tech R&D Laboratory")
        }
        if (!ns.corporation.hasResearched(div["name"], "Market-TA.I")){
          if (div["makesProducts"]) {
            var amount = 2*(ns.corporation.getResearchCost(div["name"], "Market-TA.I") + ns.corporation.getResearchCost(div["name"], "Market-TA.II"))
          } else {
            var amount = ns.corporation.getResearchCost(div["name"], "Market-TA.I") + ns.corporation.getResearchCost(div["name"], "Market-TA.II")
          }
          if (amount <= div["researchPoints"]) {
            ns.corporation.research(div["name"], "Market-TA.I")
            ns.corporation.research(div["name"], "Market-TA.II")
          }
        }
  
        // if (div["makesProducts"]) {
        //   var prod = div["products"]
        //   if (prod.length > 0) {
        //     if (ns.corporation.getProduct(div["name"], "Sector-12", prod[prod.length - 1])["developmentProgress"] == 100) {
        //       for (var j = 0; j < cities.length; j++) {
        //         if (ns.corporation.hasResearched(div["name"], "Market-TA.II")) {
        //           ns.corporation.setProductMarketTA2(div["name"], prod[prod.length - 1], true)
        //         } else {
        //           ns.corporation.sellProduct(div["name"], cities[j], prod[prod.length - 1], "MAX", "MP", true)
        //         }
        //       }
        //       if (prod.length == div["maxProducts"]) {
        //         ns.corporation.discontinueProduct(div["name"], prod[0])
        //       }
        //       var temp = prod[prod.length - 1].split("-")
        //       var count = temp[temp.length - 1]
        //       count = parseInt(count) + 1
        //       ns.corporation.makeProduct(div["name"], "Sector-12", "Strain-" + count, 10000000000, 10000000000)
        //     }
        //   } else {
        //     ns.corporation.makeProduct(div["name"], "Sector-12", "Strain-1", 10000000000, 10000000000)
        //   }
        // }
      }
      
      await(ns.sleep(10000))
  
      // Pharmaceutical Expansion Loop
      // /*
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
      // */
    }
  }