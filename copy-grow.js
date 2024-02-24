/** Runs a script to gain experience on all servers (that the player has access to at runtime) */
export async function main(ns) {
  var target = 'grow-weaken.js';
  var nodes =  scanner(ns);
  for (var i = 0; i < nodes.length; i++){
    if (ns.hasRootAccess(nodes[i])) {
      var numThreads = Math.floor(ns.getServerMaxRam(nodes[i])/ns.getScriptRam(target));
      if (numThreads > 0) {
        await ns.exec(target, nodes[i], numThreads, nodes[i])
      }
    }
  }
  if (ns.getHostname().slice(0,6) == "server") {
    target = "grow-server.js"
  }
  var numThreads = Math.floor(ns.getServerMaxRam(ns.getHostname())/ns.getScriptRam(target));
  await ns.spawn(target, numThreads, ns.getHostname());
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