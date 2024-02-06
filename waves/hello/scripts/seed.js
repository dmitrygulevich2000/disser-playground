const { Keypair } = require("@wavesenterprise/signer");

async function generate_new() {
    const addrType = 'V'

    const keyPair = await Keypair.generate()
    console.log("generated new keypair")
    console.log(keyPair.phrase())
    console.log("public key:", await keyPair.publicKey())
    console.log("private key:", await keyPair.privateKey())
    console.log("address ot type " + addrType + " :", await keyPair.address(addrType.charCodeAt(0)))
}

generate_new().then(() => {
    console.log("Success");
}).catch((err) => {
    console.error(err)
});
