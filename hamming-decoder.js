/** Solves coding contract "HammingCodes: Encoded Binary to Integer" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);

  var pos = 0
  for (var i = 0; i < data.length; i++) {
    if (data[i] == "1") {
      pos = pos ^ i
    }
  }
  data = data.slice(0, pos) + ((parseInt(data[pos]) + 1) % 2) + data.slice(pos + 1)

  var dataString = ""
  for (var i = 1; i < data.length; i++) {
    if ((Math.log(i)/Math.log(2)) % 1 != 0) {
      dataString += data[i]
    }
  }
  
  var dec = 0
  for (var i = dataString.length - 1; i >= 0; i--) {
    dec += ((2**(dataString.length - 1 - i)) * parseInt(dataString[i]))
  }
  dec = "" + dec

  ns.tprint(ns.codingcontract.attempt(dec, filename, host))
}