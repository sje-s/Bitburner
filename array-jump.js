/** Solves coding contracts "Array Jumping Game" and "Array Jumping Game II" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);
  var typ = ns.codingcontract.getContractType(filename, host);

  var shortJump = 0
  var inds = [0]
  var count = 1
  while ((inds.length != 0) && (shortJump == 0)) {
    var temp = []
    for (var i = 0; i < inds.length; i++) {
      for (var j = 1; j <= data[inds[i]]; j++) {
        if (!temp.includes(inds[i] + j)) {
          temp.push(inds[i] + j)
        }
        if (inds[i] + j >= data.length - 1) {
          shortJump = count
        }
      }
    }
    inds = temp
    count++
  }
  var retString = 0
  if (typ == "Array Jumping Game") {
    if (shortJump == 0) {
      retString = 0
    } else {
      retString = 1
    }
  } else {
    retString = shortJump
  }
  ns.tprint(ns.codingcontract.attempt(retString, filename, host))
}