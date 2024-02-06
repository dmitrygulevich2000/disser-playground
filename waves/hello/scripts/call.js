const { TRANSACTIONS, TRANSACTION_TYPES } = require("@wavesenterprise/transactions-factory")

const { CONTRACT_ID, sdk, getKeyPair } = require("./common");

async function increment(by) {
    const config = await sdk.node.config();
    const fee = config.minimumFee[TRANSACTION_TYPES.CallContract];
    console.log("config got, fee is", fee);

    const keyPair = await getKeyPair();

    const tx = TRANSACTIONS.CallContract.V5({
        fee,
        contractId: CONTRACT_ID,
        senderPublicKey: await keyPair.publicKey(),
        params: [
            {
                key: 'action', value: 'increment', type: 'string'
            },
            {
                key: 'by', value: by, type: 'integer'
            }
        ],
        payments: [],
        contractVersion: 1,
        apiVersion: "1.0"
    });

    const signedTx = await sdk.signer.getSignedTx(tx, keyPair);
    console.log("signed Tx:", signedTx);
    const sentTx = sdk.broadcast(signedTx);

    return sentTx;
}

module.exports = {
    increment
}

if (require.main === module) {
    increment(1).then((sentTx) => {
        console.log("sent Tx:", sentTx);
        console.log("Success");
    }).catch((err) => {
        console.error(err)
    });
}
