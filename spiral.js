/** Solves coding contract "Spiralize Matrix" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);

  var spiral = [];
  var side = 0;
  var fullLength = data.length * data[0].length;
  while (spiral.length < fullLength) {
    if (side == 0) {
      spiral = spiral.concat(data[0]);
      data.splice(0,1);
    } else if (side == 1) {
      spiral = spiral.concat(data.map(d => d[data[0].length-1]));
      data = data.map(function(v) {return v.slice(0,-1);});
    } else if (side == 2) {
      var temp = data[data.length - 1].slice(0);
      spiral = spiral.concat(temp.reverse());
      data.splice(data.length-1, 1);
    } else if (side == 3) {
      var temp = data.map(d => d[0]).slice(0);
      spiral = spiral.concat(temp.reverse());
      data = data.map(function(v) {return v.slice(1);});
    }
    side = (side + 1)%4
  }

  ns.tprint(ns.codingcontract.attempt(spiral, filename, host))
}