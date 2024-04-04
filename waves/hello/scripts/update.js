const { TRANSACTIONS, TRANSACTION_TYPES } = require("@wavesenterprise/transactions-factory");
const { CONTRACT_ID, sdk, getKeyPair } = require("./common");

async function update() {
    const config = await sdk.node.config();
    const fee = config.minimumFee[TRANSACTION_TYPES.UpdateContract];
    console.log("config got, fee is", fee);

    const keyPair = await getKeyPair();

    const tx = TRANSACTIONS.UpdateContract.V4({
        fee,
        imageHash: "0aa0693507a5fb344e918bcd4dec1a6af931284caa400037ecf0a923ecda7a07",
        image: "localhost:5000/inc-contract:0.2.4",
        contractId: CONTRACT_ID,
        validationPolicy: { type: "majority" },
        senderPublicKey: await keyPair.publicKey(),
        contractName: "Counter",
        apiVersion: "1.0"
    });

    const signedTx = await sdk.signer.getSignedTx(tx, keyPair);
    console.log("signed Tx:", signedTx);
    const sentTx = await sdk.broadcast(signedTx);

    return sentTx;
}

module.exports = {
    update
}

if (require.main === module) {
    update().then((sentTx) => {
        console.log("sent Tx:", sentTx);
        console.log("Success");
    }).catch((err) => {
        console.error(err)
    });
}
