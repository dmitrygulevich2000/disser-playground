const { decrement, set } = require("./call");

async function test() {
    let promises = [decrement(1), set(0)];
    const broadcasted_txs = await Promise.all(promises);
    return broadcasted_txs.map((tx) => { return tx.id} );
}

test().then((tx_ids) => {
    console.log("tx ids:", tx_ids);
    console.log("Success");
}).catch((err) => {
    console.error(err)
});

// results:
// HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g - decrement tx id - 585 height (retried due to MVCC conflict)
// AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju - set tx id - 584 height

// contract container logs:
/*
called decrement by 1
read counter value 229
called set to 0
called decrement by 1
read counter value 0
*/

/*
dmitry@dmitry-TUF-Gaming:~$ docker logs node-0 2>/dev/null | grep -E "HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g|AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju"
2024-03-10 18:42:33,090 DEBUG [tor.default-dispatcher-23] c.w.utx.UtxPoolImpl - Added new tx: AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju
2024-03-10 18:42:33,091 DEBUG [tor.default-dispatcher-19] c.w.utx.UtxPoolImpl - Added new tx: HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g
2024-03-10 18:43:11,148 WARN  [tor.default-dispatcher-11] c.w.a.h.CompositeHttpService - HTTP/1.1 response 404 Not Found for GET http://localhost:6862/contracts/AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju (took 3ms)
2024-03-10 18:43:32,900 DEBUG [tor.default-dispatcher-29] c.w.a.h.CompositeHttpService - HTTP/1.1 response 200 OK for GET http://localhost:6862/transactions/info/AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju (took 4ms)
2024-03-10 18:43:58,056 DEBUG [tor.default-dispatcher-29] c.w.a.h.CompositeHttpService - HTTP/1.1 response 200 OK for GET http://localhost:6862/transactions/info/HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g (took 4ms)
2024-03-10 18:58:41,321 DEBUG [tor.default-dispatcher-40] c.w.a.h.CompositeHttpService - HTTP/1.1 response 200 OK for GET http://localhost:6862/transactions/info/AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju (took 3ms)

dmitry@dmitry-TUF-Gaming:~$ docker logs node-1 2>/dev/null | grep -E "HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g|AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju"
2024-03-10 18:42:33,783 DEBUG [utx-pool-sync-130] c.w.utx.UtxPoolImpl - Added new tx: AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju
2024-03-10 18:42:33,788 DEBUG [utx-pool-sync-130] c.w.utx.UtxPoolImpl - Added new tx: HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g
2024-03-10 18:42:45,992 DEBUG [miner-pool-122] c.w.d.MinerTransactionsExecutor - Start executing contract transaction 'HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g'
2024-03-10 18:42:51,032 DEBUG [miner-pool-174] c.w.d.MinerTransactionsExecutor - Built executed transaction 'Gv7DomhcCR2VxbSAvhLHBC1eTHadH257QCwFD4bPAZse' for 'HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g'

dmitry@dmitry-TUF-Gaming:~$ docker logs node-2 2>/dev/null | grep -E "HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g|AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju"
2024-03-10 18:42:33,337 DEBUG [utx-pool-sync-186] c.w.utx.UtxPoolImpl - Added new tx: HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g
2024-03-10 18:42:33,341 DEBUG [utx-pool-sync-186] c.w.utx.UtxPoolImpl - Added new tx: AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju
2024-03-10 18:42:34,036 DEBUG [miner-pool-120] c.w.m.MinerTransactionsConfirmatory - The environment is not yet ready for transaction 'AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju' execution
2024-03-10 18:42:34,038 DEBUG [miner-pool-120] c.w.m.MinerTransactionsConfirmatory - The environment is not yet ready for transaction 'HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g' execution
2024-03-10 18:42:36,054 DEBUG [miner-pool-157] c.w.d.MinerTransactionsExecutor - Start executing contract transaction 'HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g'
2024-03-10 18:42:36,054 DEBUG [miner-pool-155] c.w.d.MinerTransactionsExecutor - Start executing contract transaction 'AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju'
2024-03-10 18:42:38,284 DEBUG [miner-pool-120] c.w.d.MinerTransactionsExecutor - Built executed transaction '6YB3a32m2uHaCgg8FM5nGR3MQ8E5rMDwJFzVZUNZtXDN' for 'AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju'
2024-03-10 18:42:41,271 DEBUG [miner-pool-120] c.w.d.MinerTransactionsExecutor - Built executed transaction '4WKwmhERNuJ7cxHfrANHzt6YmTULrsFQH91brR9nt8hA' for 'HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g'
2024-03-10 18:42:41,288 DEBUG [miner-pool-120] c.w.d.MinerTransactionsExecutor - Executed tx '4WKwmhERNuJ7cxHfrANHzt6YmTULrsFQH91brR9nt8hA' for 'HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g' was discarded because it caused MVCC conflict
2024-03-10 18:42:42,055 DEBUG [miner-pool-119] c.w.d.MinerTransactionsExecutor - Start executing contract transaction 'HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g'
2024-03-10 18:42:46,017 DEBUG [appender-115] c.w.d.MinerTransactionsExecutor - Contract transaction 'HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g' execution was cancelled
2024-03-10 19:00:23,256 DEBUG [tor.default-dispatcher-22] c.w.a.h.CompositeHttpService - HTTP/1.1 response 200 OK for GET http://localhost:6882/transactions/info/AxTh7qhj7hsr6ZWSLgMWionEKWpBm7XaKXndcKsEdSju (took 3ms)
2024-03-10 19:03:54,216 DEBUG [tor.default-dispatcher-37] c.w.a.h.CompositeHttpService - HTTP/1.1 response 200 OK for GET http://localhost:6882/transactions/info/HGd96rU6dGuXJB2srgh8mKC8nbeoFKyW1Ji115ckVD7g (took 3ms)
*/
