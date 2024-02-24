/** Run once the 'cct' server is purchased and fully upgraded
 *  Checks which part of the game have been purchased/accessed and starts up management scripts
 */
export async function main(ns) {
  ns.run("work-switch.js")

  try {
    ns.gang.getGangInformation()
    ns.run("gang-reg.js")
  } catch {
    ns.tprint("No Gang")
  }

  try {
    ns.corporation.getCorporation()
    ns.run("company-reg.js")
    //TODO check for divisions and start research-loop.js
  } catch {
    ns.tprint("No Corporation")
  }

  if (ns.stock.has4SDataTIXAPI()) {
    ns.run("stockTix.js")
  }
}