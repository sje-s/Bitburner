/** Solves coding contracts "Algorithmic Stock Trader I" and "Algorithmic Stock Trader II" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);
  var typ = ns.codingcontract.getContractType(filename, host);
  var num = typ.split(" ");
  num = num[num.length - 1];
  if (num == "I") {
    var val = ast_i(data);
    ns.tprint(ns.codingcontract.attempt(val, filename, host))
  } else if (num == "II") {
    var val = ast_ii(ns, data);
    ns.tprint(ns.codingcontract.attempt(val, filename, host))
  }
}
  
/** Helper Function for "Algorithmic Stock Trader I" */
/** data : content from the coding contract */
/** returns : the greatest profit that can be made from one transaction (or 0 if no profit can be made) */
function ast_i(data) {
  var valMax = 0;
  for (var i = 0; i < data.length - 1; i++){
    for (var j = i + 1; j < data.length; j++) {
      if (data[j] - data[i] > valMax) {
        valMax = data[j] - data[i]
      }
    }
  }
  return valMax
}
  
/** Helper Function for "Algorithmic Stock Trader II" */
/** data : content from the coding contract */
/** returns : greatest profit that can be made from any number of transactions (or 0 if no profit can be made) */
function ast_ii(data) {
  var low = data[0];
  var totals = [];
  for (var i = 1; i < data.length; i++) {
    if ((data[i - 1] < data[i]) && ((data[i+1] <= data[i]) || (i == data.length - 1))) {
      if (data[i] > low) {
        totals.push(data[i] - low);
      }
    }
    if ((i < data.length - 1) && (data[i - 1] >= data[i]) && (data[i+1] > data[i])) {
      low = data[i];
    }
  }

  return totals.reduce((a, b) => a + b, 0)
}