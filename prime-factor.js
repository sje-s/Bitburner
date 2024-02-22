/** Solves coding contract "Find Largest Prime Factor" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var target = ns.codingcontract.getData(filename, host);

  var i = 2;
  var factors = [];
  while (i <= target) {
    if ((target/i) == Math.floor(target/i)) {
      factors.push(i);
      target = target/i;
    } else {
      i++;
    }
  }
  ns.tprint(ns.codingcontract.attempt(factors[factors.length - 1], filename, host))
}