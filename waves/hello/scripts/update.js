const { TRANSACTIONS, TRANSACTION_TYPES } = require("@wavesenterprise/transactions-factory");
const { CONTRACT_ID, sdk, getKeyPair } = require("./common");

async function update() {
    const config = await sdk.node.config();
    const fee = config.minimumFee[TRANSACTION_TYPES.UpdateContract];
    console.log("config got, fee is", fee);

    const keyPair = await getKeyPair();

    const tx = TRANSACTIONS.UpdateContract.V4({
        fee,
        imageHash: "567a60c07a25941337e9ddf51c6a9c2ae42a9eafe1170edef57a79c450bcb602",
        image: "localhost:5000/inc-contract:0.0.5",
        contractId: CONTRACT_ID,
        validationPolicy: { type: "any" },
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
