const { TRANSACTIONS, TRANSACTION_TYPES } = require("@wavesenterprise/transactions-factory")
const { CONTRACT_ID, sdk, getKeyPair } = require("./common");

async function update() {
    const config = await sdk.node.config();
    const fee = config.minimumFee[TRANSACTION_TYPES.UpdateContract];
    console.log("config got, fee is", fee);

    const keyPair = await getKeyPair();

    const tx = TRANSACTIONS.UpdateContract.V4({
        fee,
        imageHash: "0115c99d2342b0c2feeca179d31610f4d1bdea10f5607c29772a410c1d2596fd",
        image: "localhost:5000/inc-contract:0.0.1",
        contractId: CONTRACT_ID,
        validationPolicy: { type: "any" },
        senderPublicKey: await keyPair.publicKey(),
        contractName: "Increment",
        apiVersion: "1.0"
    });

    const signedTx = await sdk.signer.getSignedTx(tx, SEED);
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
