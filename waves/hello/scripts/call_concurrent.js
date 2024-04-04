const { increment } = require("./call");

async function do_calls(count) {
    let promises = [];
    for (let i = 0; i < count; i += 1) {
        console.log("---> next concurrent call");
        let call_promise = increment(1);
        promises.push(call_promise);
    }
    const broadcasted_txs = await Promise.all(promises);
    return broadcasted_txs.map((tx) => { return tx.id} );
}

do_calls(2).then((tx_ids) => {
    console.log("tx ids:", tx_ids);
    console.log("Success");
}).catch((err) => {
    console.error(err)
});