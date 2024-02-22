/** Solves coding contract "Sanitize Parentheses in Expression" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var str = ns.codingcontract.getData(filename, host);
  var cont = true;
  var i = 0;
  let printArray = new Set();

  var editing = true;
  while (editing) {
    if (str[0] == ")") {
      str = str.substr(1, str.length);
    } else {
      editing = false;
    }
  }
  editing = true;
  while (editing) {
    if (str[str.length-1] == "(") {
      str = str.substr(0, str.length-1);
    } else {
      editing = false;
    }
  }

  if (str.length == 0) {
    ns.tprint(ns.codingcontract.attempt([""], filename, host))
    return
  }

  var eq = 0
  for (var i = 0; i < str.length; i++) {
    if (str[i] == "(") {
      eq -= 1
    } else if (str[i] == ")") {
      if (eq == 0) {
        eq = -1
        break
      }
      eq += 1
    }
  }
  if (eq == 0) {
    ns.tprint(ns.codingcontract.attempt([str], filename, host))
    return
  }

  var strings = [str];
  while (cont) {
    var temp = [];
    for (var k = 0; k < strings.length; k++) {
      var curString = strings[k];
      for (var l = 1; l < curString.length + 1; l++) {
        if ((curString[l - 1] == "(") || (curString[l - 1] == ")")) {
          var nexStr = curString.substr(0, l - 1) + curString.substr(l, curString.length)
          if (!temp.includes(nexStr)) {
            temp.push(nexStr);
          }
        }
      }
    }
    for (var m = 0; m < temp.length; m++) {
      if (completeParen(temp[m])) {
        cont = false;
        printArray.add(temp[m]);
      }
    }
    i++;
    if (i == str.length) {
      cont = false;
    }
    strings = temp;
  }
  ns.tprint(ns.codingcontract.attempt(Array.from(printArray), filename, host))
}

/** Helper Function that checks if an input string has a closing parenthesis for each opening parenthesis */
function completeParen(str) {
  var numEnd = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] == "(") {
      numEnd++;
    } else if (str[i] == ")") {
      if (numEnd == 0) {
        return false;
      } else {
        numEnd--;
      }
    }
  }
  if (numEnd == 0) {
    return true;
  }
  else {
    return false;
  }
}