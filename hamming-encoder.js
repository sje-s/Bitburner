/** Solves coding contract "HammingCodes: Integer to Encoded Binary" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);
  var bin = "" + Number(data).toString(2)
  var ham = [0]

  var i = 0
  while (i < bin.length) {
    if (((Math.log(ham.length)/Math.log(2)) % 1) == 0) {
      ham.push(0)
    } else {
      ham.push(parseInt(bin[i]))
      i++
    }
  }

  var twos = [0]
  for (var i = 1; i < ham.length; i++) {
    if (((Math.log(i)/Math.log(2)) % 1) == 0) {
      twos.push(i)
    } else {
      if (ham[i] == 1) {
        for (var j = 0; j < twos.length; j++) {
          if ((twos[j] & i) == twos[j]) {
            ham[twos[j]] = ham[twos[j]] += 1
          }
        }
      }
    }
  }
  
  var sum = 0;
  for (var i = 1; i < ham.length; i++) {
    ham[i] = ham[i] % 2
    sum += ham[i]
  }
  ham[0] = sum%2
  var retString = ham.join("")
  ns.tprint(ns.codingcontract.attempt(retString, filename, host))
}