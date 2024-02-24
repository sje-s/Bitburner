/** Script to gain experience */
export async function main(ns) {
  while(true){
    await ns.weaken(ns.args[0]);
    await ns.weaken(ns.args[0]);
    await ns.weaken(ns.args[0]);
    await ns.grow(ns.args[0]);
  }
}