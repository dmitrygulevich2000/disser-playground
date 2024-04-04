const { TRANSACTIONS, TRANSACTION_TYPES } = require("@wavesenterprise/transactions-factory")
const { sdk, getKeyPair } = require("./common");

async function deploy() {
    const config = await sdk.node.config();
    const fee = config.minimumFee[TRANSACTION_TYPES.CreateContract];
    console.log("config got, fee is", fee);

    const keyPair = await getKeyPair();

    const tx = TRANSACTIONS.CreateContract.V5({
        fee,
        image: "localhost:5000/inc-contract:0.2.1",
        imageHash: "41edca10b1a59b5094361947fe26ff594eae5ae7b68caafc635ce3bcc116a80c",
        contractName: "Counter",
        sender: keyPair.address(),
        senderPublicKey: await keyPair.publicKey(),
        validationPolicy: { type: 'majority' },
        params: [
            {
                key: 'init',
                type: 'integer',
                value: 1,
            },
        ],
        payments: [],
        apiVersion: "1.0",
    });

    const signedTx = await sdk.signer.getSignedTx(tx, keyPair);
    console.log("signed Tx:", signedTx);
    const sentTx = sdk.broadcast(signedTx);

    return sentTx;
}

module.exports = {
    deploy
}

if (require.main === module) {
    deploy().then((sentTx) => {
        console.log("sent Tx:", sentTx);
        console.log("Success");
    }).catch((err) => {
        console.error(err)
    });
}
