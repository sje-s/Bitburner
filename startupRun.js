/** First script to be run on startup
 *  Sets up copying scripts to the necessary servers, accessing the necessary servers, and purchasing/upgrading a server
 */
export async function main(ns) {
  ns.disableLog("sleep")
  await ns.exec("server-upgrade.js", "home", 1, 4)
  await ns.sleep(500)
  await ns.exec("copy-cct.js", "home", 1, "cct")
  await ns.sleep(500)
  await ns.exec("copy-script.js", "home")
  await ns.sleep(500)
  await ns.exec("quick-nuke.js", "home")
  await ns.sleep(500)
  var servRam = ns.args[0]
  if (servRam == undefined) {
    servRam = 2048
  }
  await ns.exec("server-loop.js", "cct", 1, ns.args[0])
  await ns.sleep(500)
  await ns.spawn("copy-run.js")
}