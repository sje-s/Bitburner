/** Copies scripts needed to 'hack', 'grow', or 'weaken' each server (to gain in-game money and experience) */
export async function main(ns) {
  var nodes = scanner(ns)
  for (var i = 0; i < nodes.length; i++){
    if ((nodes[i] != 'cct') && (nodes[i] != "home")){
      ns.scp('best-hack.js', nodes[i]);
      ns.scp('copy-script.js', nodes[i]);
      ns.scp('copy-run.js', nodes[i]);
      ns.scp('copy-grow.js', nodes[i]);
      ns.scp('grow-weaken.js', nodes[i]);
      ns.scp('grow-server.js', nodes[i]);
      ns.scp('backdoor.js', nodes[i]);
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