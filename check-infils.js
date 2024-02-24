/** Checks the rewards and difficulties for 'infilitrating' (completing mini-games) at various locations */
export async function main(ns) {
  var infs = ns.infiltration.getPossibleLocations()
  var difArr = []
  var sellArr = []
  var soAArr = []
  var repArr = []
  var ptArr = []
  for (var i = 0; i < infs.length; i++) {
    var inf = ns.infiltration.getInfiltration(infs[i]["name"])
    if (inf["difficulty"] < 3) {
      var mCL = inf["location"]["infiltrationData"]["maxClearanceLevel"]
      if (sellArr.length == 0) {
        difArr = [[inf["location"]["name"], inf["difficulty"],inf["location"]["city"]]]
        sellArr = [[inf["location"]["name"], inf["reward"]["sellCash"],inf["location"]["city"]]]
        soAArr = [[inf["location"]["name"], inf["reward"]["SoARep"],inf["location"]["city"]]]
        repArr = [[inf["location"]["name"], inf["reward"]["tradeRep"],inf["location"]["city"]]]
        ptArr = [[inf["location"]["name"], inf["reward"]["SoARep"]/mCL,inf["location"]["city"]]]
      } else {
        difArr.push([inf["location"]["name"], inf["difficulty"],inf["location"]["city"]])
        sellArr.push([inf["location"]["name"], inf["reward"]["sellCash"],inf["location"]["city"]])
        soAArr.push([inf["location"]["name"], inf["reward"]["SoARep"],inf["location"]["city"]])
        repArr.push([inf["location"]["name"], inf["reward"]["tradeRep"],inf["location"]["city"]])
        ptArr.push([inf["location"]["name"], inf["reward"]["SoARep"]/mCL,inf["location"]["city"]])
      }
    }
  }
  sellArr.sort((a, b) => {return a[1] - b[1]})
  soAArr.sort((a, b) => {return a[1] - b[1]})
  repArr.sort((a, b) => {return a[1] - b[1]})
  difArr.sort((a, b) => {return a[1] - b[1]})
  ptArr.sort((a, b) => {return a[1] - b[1]})
  ns.tprint(difArr)
  ns.tprint("")
  ns.tprint(sellArr)
  ns.tprint("")
  ns.tprint(soAArr)
  ns.tprint("")
  ns.tprint(repArr)
  ns.tprint("")
  ns.tprint(ptArr)

}
