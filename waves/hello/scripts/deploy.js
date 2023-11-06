const {We} = require("@wavesenterprise/sdk");
const {TRANSACTIONS, TRANSACTION_TYPES} = require("@wavesenterprise/transactions-factory")
const {Keypair} = require("@wavesenterprise/signer")

const SEED_LOCAL = 'identify nominee amused melody potato thing shuffle mixture clarify piano game segment indoor embody inmate'
const NODE_LOCAL = 'http://localhost:6862'

const sdk = new We(NODE_LOCAL);

async function deploy() {
    const config = await sdk.node.config();
    console.log("config got")
    const fee = config[TRANSACTION_TYPES];
    const keyPair = await Keypair.fromExistingSeedPhrase(SEED_LOCAL);
    console.log("keypair got")

    const tx = TRANSACTIONS.CreateContract.V5({
        fee,
        imageHash: "c8ea61e43c53b0d2b4df38c895eddd8ff184e09d82fe00fb60cbded780de0242",
        image: "inc-contract:latest",
        validationPolicy: {type: "any"},
        senderPublicKey: await keyPair.publicKey(),
        params: [
            {
                key: 'init',
                type: 'integer',
                value: '3'
            },
        ],
        payments: [],
        contractName: "Increment",
        apiVersion: "1.0"
    });

    const signedTx = await sdk.signer.getSignedTx(tx, SEED_LOCAL);
    console.log("signed Tx:", JSON.stringify(signedTx));
    const sentTx = await sdk.broadcast(signedTx);
    console.log("sent Tx:", JSON.stringify(sentTx));
}

deploy().then(() => {
    console.log("Success");
}).catch((err) => {
    console.error("ERROR")
    console.error(JSON.stringify(err))
});