/** Solves coding contract "Encryption II: Vigenere Cipher" and prints the reward */
/** @param {NS} ns */
/** args[0] : the name of the host server */
/** args[1] : the name of the file */
export async function main(ns) {
  var host = ns.args[0];
  var filename = ns.args[1];
  var data = ns.codingcontract.getData(filename, host);
  var text = data[0];
  var key = data[1];
  var encryptedText = "";
  
  for (var i = 0; i < text.length; i++) {
    var temp = (text[i].charCodeAt(0) - 65) + (key[i%key.length].charCodeAt(0) - 65);
    temp = temp % 26;
    encryptedText += String.fromCharCode(temp+65);
  }

  ns.tprint(ns.codingcontract.attempt(encryptedText, filename, host))
}