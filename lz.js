/** Solves coding contract "Compression II: LZ Decompression" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);
  
  var deString = ""
  var chunkType = 0
  var i = 0
  while (i < data.length) {
    if (data[i] != 0) {
      if (chunkType == 0) {
        deString += data.slice(i + 1, i + parseInt(data[i]) + 1)
        i += parseInt(data[i])
      } else {
        for (var j = 0; j < parseInt(data[i]); j++) {
          deString += deString[deString.length - data[i + 1]]
        }
        i++
      }
    }
    chunkType = ((chunkType + 1) % 2)
    i++
  }
  ns.tprint(ns.codingcontract.attempt(deString, filename, host))
}