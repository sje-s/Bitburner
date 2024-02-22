/** Solves coding contract "Compression I: RLE Compression" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);

  var retString = ''
  if (data.length > 1) {
    var lastChar = data[0]
    var charCount = 1

    for (var i = 1; i < data.length; i++) {
      var curChar = data[i]
      if (lastChar != curChar) {
        retString += charCount
        retString += lastChar
        charCount = 1
      } else if (charCount == 9) {
        retString += charCount
        retString += lastChar
        charCount = 1
      } else {
        charCount++
      }
      lastChar = curChar
    }
    retString += charCount
    retString += curChar
  } else if (data.length == 1) {
    retString += 1
    retString += data[0]
  }

  ns.tprint(ns.codingcontract.attempt(retString, filename, host))
}