/** Make new products cyclically for each division in the corporation */
export async function main(ns) {
  ns.disableLog("sleep")
  var corp = ns.corporation.getCorporation()
  var divs = corp["divisions"]
  var bil = 1000000000

  while(true) {
    await ns.sleep(0)
    for (var i = 0; i < divs.length; i++) {
      var div = ns.corporation.getDivision(divs[i])
      if (div["makesProducts"]) {
        var prod = div["products"]
        if (prod.length > 0) {
          if (ns.corporation.getProduct(div["name"], "Sector-12", prod[prod.length - 1])["developmentProgress"] == 100) {
            if (ns.corporation.hasResearched(div["name"], "Market-TA.II")) {
              ns.corporation.setProductMarketTA2(div["name"], prod[prod.length - 1], true)
            } else {
              var cities = div["cities"]
              for (var j = 0; j < cities.length; j++) {
                ns.corporation.sellProduct(div["name"], cities[j], prod[prod.length - 1], "MAX", "MP", true)
              }
            }
            if (prod.length == div["maxProducts"]) {
              ns.corporation.discontinueProduct(div["name"], prod[0])
            }
            var temp = prod[prod.length - 1].split("-")
            var count = temp[temp.length - 1]
            count = parseInt(count) + 1
            if (ns.corporation.getCorporation()["funds"] > ((20 * bil) + Math.floor(bil/10))) {
              ns.corporation.makeProduct(div["name"], "Sector-12", "Strain-" + count, 10000000000, 10000000000)
            } else {
              var invAm = ns.corporation.getCorporation()["funds"] - Math.floor(bil/10)
              invAm *= (3/8)
              invAm = Math.floor(invAm)
              ns.corporation.makeProduct(div["name"], "Sector-12", "Strain-" + count, invAm, invAm)
            }
          }
        } else {
          if (ns.corporation.getCorporation()["funds"] > ((20 * bil) + Math.floor(bil/10))) {
            ns.corporation.makeProduct(div["name"], "Sector-12", "Strain-1", 10000000000, 10000000000)
          } else {
            var invAm = ns.corporation.getCorporation()["funds"] - Math.floor(bil/10)
            invAm *= (3/8)
            invAm = Math.floor(invAm)
            ns.corporation.makeProduct(div["name"], "Sector-12", "Strain-1", invAm, invAm)
          }
        }
      }
    }
  }
}