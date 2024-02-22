/** Solves coding contract "Subarray with Maximum Sum" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);

  var sum = data[0]
  for (var i = 0; i < data.length; i++) {
    for (var j = i; j < data.length + 1; j++) {
      var temp = data.slice(i, j).reduce((a, b) => a + b, 0)
      if (temp > sum) {
        sum = temp
      }
    }
  }
  ns.tprint(ns.codingcontract.attempt(sum, filename, host))
}