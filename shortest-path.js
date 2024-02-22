/** Solves coding contract "Shortest Path in a Grid" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);

  var rightPath = []
  var paths = []
  var loc = [0, 0]
  var notEnd = true
  var exist = []
  if (data[loc[0]][loc[1] + 1] == 0) {
    paths.push([[0, 1], "R"])
  }
  if (data[loc[0] + 1][loc[1]] == 0) {
    paths.push([[1, 0], "D"])
  }
  while ((paths.length > 0) && notEnd) {
    var temp = []
    for (var i = 0; i < paths.length; i++) {
      
      loc = paths[i][0]
      if ((loc[0] - 1 >= 0) && (data[loc[0] - 1][loc[1]] == 0) && (paths[i][paths[i].length - 1] != "D")) {
        var newLoc = [loc[0] - 1, loc[1]]
        if (!exist.includes((newLoc[0] * data[0].length) + newLoc[1])) {
          var newPath = paths[i].slice()
          newPath[0] = newLoc
          newPath.push("U")
          temp.push(newPath)
          if (_.isEqual(newLoc, [data.length - 1, data[0].length - 1])) {
            rightPath = newPath.slice(1)
            notEnd = false
          }
          exist.push((newLoc[0] * data[0].length) + newLoc[1])
        }
      }      
      if ((loc[0] + 1 < data.length) && (data[loc[0] + 1][loc[1]] == 0) && (paths[i][paths[i].length - 1] != "U")) {
        var newLoc = [loc[0] + 1, loc[1]]        
        if (!exist.includes((newLoc[0] * data[0].length) + newLoc[1])) {
          var newPath = paths[i].slice()
          newPath[0] = newLoc
          newPath.push("D")
          temp.push(newPath)
          if (_.isEqual(newLoc, [data.length - 1, data[0].length - 1])) {
            rightPath = newPath.slice(1)
            notEnd = false
          }
          exist.push((newLoc[0] * data[0].length) + newLoc[1])
        }
      }      
      if ((loc[1] - 1 >= 0) && (data[loc[0]][loc[1] - 1] == 0)  && (paths[i][paths[i].length - 1] != "R")) {
        var newLoc = [loc[0], loc[1] - 1]
        if (!exist.includes((newLoc[0] * data[0].length) + newLoc[1])) {
          var newPath = paths[i].slice()
          newPath[0] = newLoc
          newPath.push("L")
          temp.push(newPath)
          if (_.isEqual(newLoc, [data.length - 1, data[0].length - 1])) {
            rightPath = newPath.slice(1)
            notEnd = false
          }
          exist.push((newLoc[0] * data[0].length) + newLoc[1])
        }
      }
      if ((loc[1] + 1 < data[0].length) && (data[loc[0]][loc[1] + 1] == 0) && (paths[i][paths[i].length - 1] != "L")) {
        var newLoc = [loc[0], loc[1] + 1]
        if (!exist.includes((newLoc[0] * data[0].length) + newLoc[1])) {
          var newPath = paths[i].slice()
          newPath[0] = newLoc
          newPath.push("R")
          temp.push(newPath)
          if (_.isEqual(newLoc, [data.length - 1, data[0].length - 1])) {
            rightPath = newPath.slice(1)
            notEnd = false
          }
          exist.push((newLoc[0] * data[0].length) + newLoc[1])
        }
      }
    }
    paths = temp
  }
  ns.tprint(ns.codingcontract.attempt(rightPath.join(""), filename, host))
}