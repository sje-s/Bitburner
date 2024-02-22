/** Solves coding contract "Merge Overlapping Intervals" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);
  data = data.sort(function(a, b) { return a[0] - b[0]; })

  var intArr = [data[0]]
  var added = false
  for (var i = 1; i < data.length; i++) {
    for (var j = 0; j < intArr.length; j++) {
      if ((data[i][0] <= intArr[j][1]) && (data[i][0] >= intArr[j][0])) {
        if (data[i][1] >= intArr[j][1]) {
          intArr[j][1] = data[i][1];
        }
        added = true
      } 
      if ((data[i][1] >= intArr[j][0]) && (data[i][1] <= intArr[j][1])) {
        if (data[i][0] <= intArr[j][0]) {
          intArr[j][0] = data[i][0];
        }
        added = true
      }
      if ((!added) && (data[i][1] < intArr[j][0])) {
        intArr.splice(j, 0, data[i])
        break
      }
    }
    if (added) {
      added = false
    } else if (data[i][0] > intArr[intArr.length - 1][1]) {
      intArr.push(data[i])
    }
  }
  ns.tprint(ns.codingcontract.attempt(intArr, filename, host))
}