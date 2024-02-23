/** Move workers around for agriculture department of corporation */
export async function main(ns) {
  ns.disableLog("sleep")
  var cities = ["Sector-12", "Aevum", "Volhaven", "Chongqing", "New Tokyo", "Ishima"]
  var div = "Agri-vision"

  while (true) {
    await ns.sleep(0)
    var check = true
    if ((check) && (ns.corporation.getCorporation()["state"] == "START")) {
      for (var i = 0; i < cities.length; i++) {
        var mat1 = ns.corporation.getMaterial(div, cities[i], "Food")
        var mat2 = ns.corporation.getMaterial(div, cities[i], "Plants")
        var off = ns.corporation.getOffice(div, cities[i])["employeeJobs"]
        if ((((mat1["productionAmount"] - mat1["actualSellAmount"]).toFixed(1) > 0) && (mat1["stored"] >= 100)) || (((mat2["productionAmount"] - mat2["actualSellAmount"]).toFixed(1) > 0) && (mat2["stored"] > 100))) {
          if (off["Management"] > 0) {
            ns.corporation.setAutoJobAssignment(div, cities[i], "Management", off["Management"] - 1)
            ns.corporation.setAutoJobAssignment(div, cities[i], "Engineer", off["Engineer"] + 1)
          } else if (off["Operations"] > 0) {
            ns.corporation.setAutoJobAssignment(div, cities[i], "Operations", off["Operations"] - 1)
            ns.corporation.setAutoJobAssignment(div, cities[i], "Engineer", off["Engineer"] + 1)
          } else if (off["Engineer"] > 0) {
            ns.corporation.setAutoJobAssignment(div, cities[i], "Engineer", off["Engineer"] - 1)
            ns.corporation.setAutoJobAssignment(div, cities[i], "Business", off["Business"] + 1)
          }
        }
      }
      check = false
    } else if ((!check) && (ns.corporation.getCorporation()["state"] != "START")) {
      check = true
    }
  }
}