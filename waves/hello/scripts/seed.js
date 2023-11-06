const Waves = require("@wavesenterprise/js-sdk");

const seed = Waves.Seed.create();

console.log(seed.phrase);
console.log(seed.address);
console.log(seed.keyPair);
