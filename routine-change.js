/** Allow 'training' to run until stats are at predecided thresholds, then change the 'training' that's being run */
export async function main(ns) {
  while(true) {
    await ns.sleep(0)
    if (ns.getPlayer().skills.dexterity >= 300) {
      ns.singularity.gymWorkout("Powerhouse Gym", "Agility", false)
    }
    if (ns.getPlayer().skills.agility >= 300) {
      ns.singularity.workForFaction("The Black Hand", "hacking", false)
      return
    }
  }
}