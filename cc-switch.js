/** Runs through each server, finds any coding contracts on the server, and runs the appropriate script based on the contract type */
/** @param {NS} ns */
export async function main(ns) {
  var servers = scanner(ns)
  for (var j = 0; j < servers.length; j++) {
    var host = servers[j];
    var typArr = ns.ls(host, ".cct")

    for (var i = 0; i < typArr.length; i++) {
      var filename = typArr[i]
      var typ = ns.codingcontract.getContractType(filename, host)
      if (typ == "Find Largest Prime Factor") {
        ns.run("prime-factor.js", 1, host, filename)
      } else if (typ == "Subarray with Maximum Sum") {
        ns.run("max-sum.js", 1, host, filename)
      } else if (typ == "Total Ways to Sum") {
        ns.run("num-sum.js", 1, host, filename)
      } else if (typ == "Total Ways to Sum II") {
        ns.run("num-sum.js", 1, host, filename)
      } else if (typ == "Spiralize Matrix") {
        ns.run("spiral.js", 1, host, filename)
      } else if (typ == "Array Jumping Game") {
        ns.run("array-jump.js", 1, host, filename)
      } else if (typ == "Array Jumping Game II") {
        ns.run("array-jump.js", 1, host, filename)
      } else if (typ == "Merge Overlapping Intervals") {
        ns.run("intervals.js", 1, host, filename)
      } else if (typ == "Generate IP Addresses") {
        ns.run("ip.js", 1, host, filename)
      } else if (typ == "Algorithmic Stock Trader I") {
        ns.run("stock-trader.js", 1, host, filename)
      } else if (typ == "Algorithmic Stock Trader II") {
        ns.run("stock-trader.js", 1, host, filename)
      } else if (typ == "Algorithmic Stock Trader III") {
        ns.run("ast-iii-iv.js", 1, host, filename)
      } else if (typ == "Algorithmic Stock Trader IV") {
        ns.run("ast-iii-iv.js", 1, host, filename)
      } else if (typ == "Minimum Path Sum in a Triangle") {
        ns.run("mps-triangle.js", 1, host, filename)
      } else if (typ == "Unique Paths in a Grid I") {
        ns.run("unique-path.js", 1, host, filename)
      } else if (typ == "Unique Paths in a Grid II") {
        ns.run("unique-path.js", 1, host, filename)
      } else if (typ == "Shortest Path in a Grid") {
        ns.run("shortest-path.js", 1, host, filename)
      } else if (typ == "Sanitize Parentheses in Expression") {
        ns.run("paren.js", 1, host, filename)
      } else if (typ == "Find All Valid Math Expressions") {
        ns.run("valid-math.js", 1, host, filename)
      } else if (typ == "HammingCodes: Integer to Encoded Binary") {
        ns.run("hamming-encoder.js", 1, host, filename)
      } else if (typ == "HammingCodes: Encoded Binary to Integer") {
        ns.run("hamming-decoder.js", 1, host, filename)
      } else if (typ == "Proper 2-Coloring of a Graph") {
        ns.run("2-color.js", 1, host, filename)
      } else if (typ == "Compression I: RLE Compression") {
        ns.run("rle-comp.js", 1, host, filename)
      } else if (typ == "Compression II: LZ Decompression") {
        ns.run("lz.js", 1, host, filename)
      } else if (typ == "Compression III: LZ Compression") {
        ns.run("lz-encode.js", 1, host, filename)
      } else if (typ == "Encryption I: Caesar Cipher") {
        ns.run("caesar.js", 1, host, filename)
      } else if (typ == "Encryption II: Vigenère Cipher") {
        ns.run("vigenere-cipher.js", 1, host, filename)
      }  
      await ns.sleep(1)
    }
    await ns.sleep(1)
  }
}

/** @param {NS} ns */
/** return: list of all servers */
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