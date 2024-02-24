/** Runs a script to gain experience on the home server and all purchased servers, and a script to gain money and experience on all other servers (that the player has access to at runtime) */
export async function main(ns) {
  var target = 'best-hack.js';
  var nodes = scanner(ns);
  for (var i = 1; i < nodes.length; i++){
    if ((nodes[i] != ns.getHostname()) && (ns.hasRootAccess(nodes[i])) && (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(nodes[i]))) {
      var numThreads = Math.floor(ns.getServerMaxRam(nodes[i])/ns.getScriptRam(target));
      if (numThreads > 0) {
        await ns.exec(target, nodes[i], numThreads, nodes[i])
      }
    }
  }
  if (ns.getHostname().slice(0,6) == "server") {
    target = "grow-server.js"
  }

  if (ns.getHostname() != "home") {
    return
  }

  target = "grow-weaken.js"
  var numThreads = Math.floor((ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname()) + ns.getScriptRam("copy-run.js"))/ns.getScriptRam(target));
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