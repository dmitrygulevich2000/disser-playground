const { We } = require("@wavesenterprise/sdk");
const { Keypair } = require("@wavesenterprise/signer")

const NODE_URL = 'http://localhost:6862'
const SEED = 'virtual trim sunset enrich into pet embody never trend announce clarify bulk opinion estate heart'

const CONTRACT_ID = 'HwuXTDCWQSEt3ggBVPnKrTCkiPcXtNwC4u1RkgSg63Wd'

const sdk = new We(NODE_URL);

async function getKeyPair() {
    const keyPair = await Keypair.fromExistingSeedPhrase(SEED);
    keyPair.setNetworkByte('V'.charCodeAt(0));
    console.log("keypair got:", keyPair);
    return keyPair
}

module.exports = {
    CONTRACT_ID,
    sdk,
    getKeyPair,
}