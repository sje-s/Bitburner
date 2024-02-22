/** Solves coding contract "Generate IP Addresses" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);

  var possIPs = [[data]]
  for (var i = 0; i < 3; i++) {
    var temp = []
    for (var j = 0; j < possIPs.length; j++) {
      if (possIPs[j][i].length > 0) {
        var newIP = []
        for (var k = 0; k < i; k++) {
          newIP.push(possIPs[j][k])
        }
        newIP.push(possIPs[j][i][0])
        newIP.push(possIPs[j][i].slice(1))
        temp.push(newIP)
      }

      if ((possIPs[j][i].length > 1) && (possIPs[j][i][0] != "0")) {
        var newIP = []
        for (var k = 0; k < i; k++) {
          newIP.push(possIPs[j][k])
        }
        newIP.push(possIPs[j][i].slice(0, 2))
        newIP.push(possIPs[j][i].slice(2))
        temp.push(newIP)
      }

      if ((possIPs[j][i].length > 2) && (possIPs[j][i][0] != "0") && (parseInt(possIPs[j][i].slice(0, 3)) <= 255)) {
        var newIP = []
        for (var k = 0; k < i; k++) {
          newIP.push(possIPs[j][k])
        }
        newIP.push(possIPs[j][i].slice(0, 3))
        newIP.push(possIPs[j][i].slice(3))
        temp.push(newIP)
      }
    }

    possIPs = temp
  }

  var finalIPs = []
  for (var k = 0; k < possIPs.length; k++) {
    if ((possIPs[k].length == 4) && (possIPs[k][possIPs[k].length - 1].length < 4) && (possIPs[k][possIPs[k].length - 1][0] != "0") && (parseInt(possIPs[k][possIPs[k].length - 1])<= 255)) {
      finalIPs.push(possIPs[k].join("."))
    }
  }
  ns.tprint(ns.codingcontract.attempt(finalIPs, filename, host))
}