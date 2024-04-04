const { TRANSACTIONS, TRANSACTION_TYPES } = require("@wavesenterprise/transactions-factory")

const { CONTRACT_ID, CONTRACT_VERSION, sdk, getKeyPair } = require("./common");

async function call(params) {
    const config = await sdk.node.config();
    const fee = config.minimumFee[TRANSACTION_TYPES.CallContract];
    console.log("config got, fee is", fee);

    const keyPair = await getKeyPair();

    const tx = TRANSACTIONS.CallContract.V5({
        fee,
        contractId: CONTRACT_ID,
        senderPublicKey: await keyPair.publicKey(),
        params: params,
        payments: [],
        contractVersion: CONTRACT_VERSION,
        apiVersion: "1.0"
    });

    const signedTx = await sdk.signer.getSignedTx(tx, keyPair);
    console.log("signed Tx:", signedTx);
    const sentTx = sdk.broadcast(signedTx);

    return sentTx;
}

async function increment(by) {
    return call([
        {
            key: 'action', value: 'increment', type: 'string'
        },
        {
            key: 'by', value: by, type: 'integer'
        }
    ])
}

async function multiply(by) {
    return call([
        {
            key: 'action', value: 'multiply', type: 'string'
        },
        {
            key: 'by', value: by, type: 'integer'
        }
    ])
}

async function decrement(by) {
    return call([
        {
            key: 'action', value: 'decrement', type: 'string'
        },
        {
            key: 'by', value: by, type: 'integer'
        }
    ])
}

async function set(to) {
    return call([
        {
            key: 'action', value: 'set', type: 'string'
        },
        {
            key: 'to', value: to, type: 'integer'
        }
    ])
}

module.exports = {
    increment,
    multiply,
    decrement,
    set,
}

if (require.main === module) {
    set(1).then((sentTx) => {
        console.log("sent Tx:", sentTx);
        console.log("Success");
    }).catch((err) => {
        console.error(err)
    });
}
