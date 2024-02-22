/** Solves coding contract "Minimum Path Sum in a Triangle" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);
  var ord = smallTriangle(data, 0);
  var retStr = "" + ord[0] + " (" + ord[1][ord[1].length - 1];
  for (var i = ord[1].length - 2; i >= 0; i--) {
    retStr += " -> " + ord[1][i];
  }
  retStr += ")";
  ns.tprint(ns.codingcontract.attempt(retStr, filename, host))
}

/** Recursive helper function */
/** data : content of the coding contract */
/** index : element in row to add to path */
/** return : list of format [sum, list of values/path through triangle] */
function smallTriangle(data, index) {
  if (data.length == 1) {
    return [data[0][index], [data[0][index]]];
  } else {
    var left = smallTriangle(data.slice(1, data.length), index);
    var right = smallTriangle(data.slice(1, data.length), index + 1);
    if (left[0] < right[0]) {
      return [left[0] + data[0][index], left[1].concat([data[0][index]])]
    } else {
      return [right[0] + data[0][index], right[1].concat([data[0][index]])]
    }
  }
}