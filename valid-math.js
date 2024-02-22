/** Solves coding contract "Find All Valid Math Expressions" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);
  var target = data[1]
  var dataNums = data[0]

  var numCombos = [[dataNums]]
  var lastRound = [[dataNums]]
  for (var i = 1; i < dataNums.length; i++) {
    var round = []
    for (var j = 0; j < lastRound.length; j++) {
      for (var k = 0; k < lastRound[j].length; k++) {
        for (var l = 1; l < lastRound[j][k].length; l++) {
          var temp = lastRound[j].slice()
          var item = temp[k].slice()
          temp[k] = item.slice(0, l)
          temp.splice(k+1, 0, item.slice(l))
          if ((round.find(i => (i.join(" ") == temp.join(" "))) == undefined) && ((temp[k+1].length == 1) || (temp[k+1][0] != 0))) {
            round.push(temp)
          }
        }
      }
      await ns.sleep(1)
    }
    await ns.sleep(1)
    numCombos = numCombos.concat(round)
    lastRound = round
  }

  var numCorrect = []
  for (var i = 0; i < numCombos.length; i++) {
    var ops = []
    for (var j = 0; j < numCombos[i].length - 1; j++) {
      ops.push("+")
    }

    var opsCombos = []
    if (ops.length > 0) {
      opsCombos = opHelper(ns, ops.slice(), 0)
    } else {
      opsCombos = ops
    }
    for (var k = 0; k < opsCombos.length; k++) {
      var temp = mathHelper(ns, numCombos[i], opsCombos[k], target)
      if (temp.length > 0) {
        numCorrect.push(temp)
      }
    }
  }
  ns.tprint(ns.codingcontract.attempt(numCorrect, filename, host))
}

/** Helper function to put together potentially-correct lists of operators */
function opHelper(ns, ops, ind) {
  var opsList = []
  if (ind == (ops.length - 1)) {
    var newOp = ops.slice()
    newOp[ind] = "+"
    opsList.push(newOp.slice())
    newOp[ind] = "-"
    opsList.push(newOp.slice())
    newOp[ind] = "*"
    opsList.push(newOp.slice())
  } else {
    var newOp = ops.slice()
    newOp[ind] = "+"
    opsList = opsList.concat(opHelper(ns, newOp, ind + 1))
    newOp[ind] = "-"
    opsList = opsList.concat(opHelper(ns, newOp, ind + 1))
    newOp[ind] = "*"
    opsList = opsList.concat(opHelper(ns, newOp, ind + 1))
  }
  return opsList
}

/** Helper Function which checks the validity of a math expression, based on the input string, ops list, and target value */
function mathHelper(ns, string, ops, target) {
  var string2 = string.slice()
  var ops2 = ops.slice()
  var string3 = [parseInt(string2[0])]
  var ops3 = []
  for (var i = 0; i < ops2.length; i++) {
    if (ops2[i] == "*") {
      string3[string3.length - 1] = parseInt(string3[string3.length - 1]) * parseInt(string2[i + 1])
    } else {
      string3.push(parseInt(string2[i + 1]))
      ops3.push(ops2[i])
    }
  }

  var result = string3[0]
  for (var i = 0; i < ops3.length; i++) {
    if (ops3[i] == "+") {
      result = result + string3[i+1]
    } else if (ops3[i] == "-") {
      result = result - string3[i+1]
    }
  }

  if (result == target) {
    var toR = string2[0]
    for (var i = 0; i < ops2.length; i++) {
      toR += ops2[i]
      toR += string2[i + 1]
    }
    return toR
  } else {
    return ""
  }
}