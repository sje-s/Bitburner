/** Attempts to gain access ('nuke') to each server and to gain access to different server ports */
export async function main(ns) {
  var serverList = scanner(ns)
  
  for (var i = 0; i < serverList.length; i++) {
    try {
      ns.brutessh(serverList[i])
      ns.ftpcrack(serverList[i])
      ns.relaysmtp(serverList[i])
      ns.httpworm(serverList[i])
      ns.sqlinject(serverList[i])
    } catch {}

    try {
      ns.nuke(serverList[i])
    } catch {
      ns.tprint(serverList[i])
    }
  }
}

/** Returns a list of all servers */
function scanner(ns) {
  var myServers = ns.getPurchasedServers()
  var scanList = ["home"]
  var round = ["home"]
  var temp = []
  var cont = true

  while (cont) {
    temp = []
    for (var i = 0; i < round.length; i++) {
      var tempList = ns.scan(round[i])
      for (var j = 0; j < tempList.length; j++) {
        if ((!scanList.includes(tempList[j])) && (!myServers.includes(tempList[j]))) {
          // if (tempList[j] == "blade") {
          //   ns.tprint(round[i])
          // }
          temp = temp.concat([tempList[j]])
          scanList = scanList.concat([tempList[j]])
        }
      }
    }
    round = temp
    if (round.length == 0) {
      cont = false
    }
  }
  return scanList
}