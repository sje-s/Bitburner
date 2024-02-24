/** Script used to copy necessary files onto a new server (usually the 'CCT' server) */
export async function main(ns) {
    var toS = ns.args[0]
  if (ns.args[1] == undefined) {
    var source = ns.getHostname()
  } else {
    var source = ns.args[1]
  }
  ns.scp('copy-cct.js', toS, source);
  ns.scp('numSums.js', toS, source);
  ns.scp('paren.js', toS, source);
  ns.scp('prime-factor.js', toS, source);
  ns.scp('spiral.js', toS, source);
  ns.scp('vigenere-cipher.js', toS, source);
  
  ns.scp('2-color.js', toS, source);
  ns.scp('caesar.js', toS, source);
  ns.scp('intervals.js', toS, source);
  ns.scp('lz.js', toS, source);
  ns.scp('mps-triangle.js', toS, source);
  ns.scp('stock-trader.js', toS, source);
  ns.scp('shortest-path.js', toS, source);
  ns.scp('ip.js', toS, source);
  ns.scp('unique-path.js', toS, source)
  ns.scp('array-jump.js', toS, source)
  ns.scp('rle-comp.js', toS, source)
  ns.scp('max-sum.js', toS, source)
  ns.scp('valid-math.js', toS, source)
  ns.scp('hamming-decoder.js', toS, source)
  ns.scp('hamming-encoder.js', toS, source)
  ns.scp('ast-iii-iv.js', toS, source)
  ns.scp('cc-switch.js', toS, source)
  ns.scp('num-sums.js', toS, source)
  ns.scp('lz-encode.js', toS, source)
  ns.scp('num-sum.js', toS, source)

  ns.scp('temp.js', toS, source)
  ns.scp('stockTix.js', toS, source)
  ns.scp('stockSeller.js', toS, source)
  ns.scp('quick-nuke.js', toS, source)
  ns.scp('copy-run.js', toS, source)
  ns.scp('best-hack.js', toS, source)
  ns.scp('company-reg.js', toS, source)
  ns.scp('gang-reg.js', toS, source)
  ns.scp('server-upgrade.js', toS, source)
  ns.scp('buy-neuro.js', toS, source)
  ns.scp('neuro-aug.js', toS, source)
  ns.scp('startupCCT.js', toS, source)
  ns.scp('gang-member-tasks.js', toS, source)
  ns.scp('territory-check.js', toS, source)
  ns.scp('server-loop.js', toS, source)
  ns.scp('work-switch.js', toS, source)
  
  ns.scp('agri-hiring-manager.js', toS, source)
  ns.scp('comp-temp-log.js', toS, source)
  ns.scp('corp-phase-1.js', toS, source)
  ns.scp('corp-phase-2.js', toS, source)
  ns.scp('corp-phase-3.js', toS, source)
  ns.scp('energy-morale-reg.js', toS, source)
  ns.scp('product-creation.js', toS, source)
  ns.scp('research-loop.js', toS, source)
}