/** Solves coding contract "Proper 2-Coloring of a Graph" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);
  var colors = [];
  for (var i = 0; i < data[0]; i++) {
    colors.push(-1);
  }

  colors[0] = 0;
  var inds = [0]
  var cont = true
  var graph = data[1];
  while (colors.includes(-1) && cont) {
    if (inds.length != 0) {
      for (var j = 0; j < graph.length; j++) {
        var node = graph[j];
        if (node[0] == inds[0]) {
          if (colors[node[1]] == -1) {
            colors[node[1]] = (colors[node[0]] + 1)%2;
            inds.push(node[1]);
          } else if (colors[node[1]] != ((colors[node[0]] + 1)%2)) {
            cont = false
            colors = []
          }
        }
        if (node[1] == inds[0]) {
          if (colors[node[0]] == -1) {
            colors[node[0]] = (colors[node[1]] + 1)%2;
            inds.push(node[0]);
          } else if (colors[node[0]] != ((colors[node[1]] + 1)%2)) {
            cont = false
            colors = []
          }
        }
      }
      inds.shift();
    } else {
      var newStart = colors.indexOf(-1);
      colors[newStart] = 0;
      inds.push(newStart);
    }
  }
  for (var i = 0; i < graph.length; i++) {
    var pair = graph[i]
    if (colors[pair[0]] == colors[pair[1]]) {
      colors = []
      break
    }
  }
  ns.tprint(ns.codingcontract.attempt(colors, filename, host))
}