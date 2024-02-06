const { TRANSACTIONS, TRANSACTION_TYPES } = require("@wavesenterprise/transactions-factory")
const { sdk, getKeyPair } = require("./common");

async function deploy() {
    const config = await sdk.node.config();
    const fee = config.minimumFee[TRANSACTION_TYPES.CreateContract];
    console.log("config got, fee is", fee);

    const keyPair = await getKeyPair();

    const tx = TRANSACTIONS.CreateContract.V5({
        fee,
        image: "localhost:5000/inc-contract:0.0.1",
        imageHash: "a5534fa0493d763f69b2bff7cfb2bb3fab192d263190e5890919c66518c0e1eb",
        contractName: "Increment",
        sender: keyPair.address(),
        senderPublicKey: await keyPair.publicKey(),
        validationPolicy: { type: 'any' },
        params: [
            {
                key: 'init',
                type: 'integer',
                value: 1,
            },
        ],
        payments: [],
        apiVersion: "1.0"
    });

    const signedTx = await sdk.signer.getSignedTx(tx, SEED);
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
