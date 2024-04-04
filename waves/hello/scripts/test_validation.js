const { multiply, increment } = require("./call");

async function test() {
    let promises = [multiply(10), increment(1)];
    const broadcasted_txs = await Promise.all(promises);
    return broadcasted_txs.map((tx) => { return tx.id} );
}

test().then((tx_ids) => {
    console.log("tx ids:", tx_ids);
    console.log("Success");
}).catch((err) => {
    console.error(err)
});

/*
sleeps yield same execution order
    mul: GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR
    inc: AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g

    miner container logs
        49R55p... on height 523: called set to 1
        ---------------
        GKBPMZ... on height 540: increment(1): sleeping 0 seconds...
        GKBPMZ... on height 540: increment(1): read counter value 1
        GKBPMZ... on height 541: increment(1): sleeping 0 seconds...
        GKBPMZ... on height 541: increment(1): read counter value 1
        AkiQYV... on height 541: multiply(10): sleeping 2 seconds...
        AkiQYV... on height 541: multiply(10): read counter value 2
    miner logs
        2024-04-04 09:21:42,226 DEBUG [tor.default-dispatcher-17] c.w.utx.UtxPoolImpl - Added new tx: GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR
        2024-04-04 09:21:42,229 DEBUG [tor.default-dispatcher-18] c.w.utx.UtxPoolImpl - Added new tx: AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g
        2024-04-04 09:21:43,683 DEBUG [-results-handler-pool-102] c.w.d.v.ContractValidatorResultsHandler - Contract validation for tx 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR' and key-block id '4yVG5DywrKsBARd1DtJLN3JoenHAegYGv1w5TZJTwHuK3g8aTNrKuwcJxven6jpcStLwohY8ZLFWJhcf8vPsBEqV' discarded, cause -  already in results store
        2024-04-04 09:21:44,116 DEBUG [miner-pool-151] c.w.d.MinerTransactionsExecutor - Start executing contract transaction 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR'
        2024-04-04 09:21:44,177 DEBUG [miner-pool-150] c.w.d.MinerTransactionsExecutor - Built executed transaction '7uNGuXCoN1aRJ7RwCAZtRGpqVNWZ5Hj2yjSVrwUzCCWK' for 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR'
        2024-04-04 09:21:45,684 DEBUG [-results-handler-pool-102] c.w.d.v.ContractValidatorResultsHandler - Contract validation for tx 'AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g' and key-block id '4yVG5DywrKsBARd1DtJLN3JoenHAegYGv1w5TZJTwHuK3g8aTNrKuwcJxven6jpcStLwohY8ZLFWJhcf8vPsBEqV' discarded, cause -  already in results store
        2024-04-04 09:21:46,685 DEBUG [-results-handler-pool-102] c.w.d.v.ContractValidatorResultsHandler - Contract validation for tx 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR' and key-block id '34kjKNPL2ZrgyYCGheRANAxAxqZjZ51stHJ2Go21v6j4ZNb61WNGSroXJDMj4ZcYR2CxSH1HY13pRsxmrheffn8j' discarded, cause -  already in results store
        2024-04-04 09:21:47,109 DEBUG [miner-pool-150] c.w.d.MinerTransactionsExecutor - Start executing contract transaction 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR'
        2024-04-04 09:21:47,141 DEBUG [miner-pool-106] c.w.d.MinerTransactionsExecutor - Built executed transaction 'F5PwwetWSehguHr54SDTbS7oVgCsdwZdCjE3VJd6Zua9' for 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR'
        2024-04-04 09:21:48,686 DEBUG [-results-handler-pool-102] c.w.d.v.ContractValidatorResultsHandler - Contract validation for tx 'AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g' and key-block id '34kjKNPL2ZrgyYCGheRANAxAxqZjZ51stHJ2Go21v6j4ZNb61WNGSroXJDMj4ZcYR2CxSH1HY13pRsxmrheffn8j' discarded, cause -  already in results store
        2024-04-04 09:21:49,118 DEBUG [miner-pool-117] c.w.d.MinerTransactionsExecutor - Start executing contract transaction 'AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g'
        2024-04-04 09:21:51,159 DEBUG [miner-pool-117] c.w.d.MinerTransactionsExecutor - Built executed transaction '7Uk7n8oAyADU763aQbyLoBaRaCoFWnThCmrWvXFsQTAq' for 'AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g'

    validator container logs
        49R55p... on height 522: called set to 1
        ---------------
        49R55p... on height 523: called set to 1
        ---------------
        AkiQYV... on height 540: multiply(10): sleeping 2 seconds...
        GKBPMZ... on height 540: increment(1): sleeping 0 seconds...
        GKBPMZ... on height 540: increment(1): read counter value 1
        AkiQYV... on height 540: multiply(10): read counter value 2
        AkiQYV... on height 541: multiply(10): sleeping 2 seconds...
        GKBPMZ... on height 541: increment(1): sleeping 0 seconds...
        GKBPMZ... on height 541: increment(1): read counter value 1
        AkiQYV... on height 541: multiply(10): read counter value 2
    validator logs
        2024-04-04 09:21:42,877 DEBUG [utx-pool-sync-112] c.w.utx.UtxPoolImpl - Added new tx: AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g
        2024-04-04 09:21:42,881 DEBUG [utx-pool-sync-112] c.w.utx.UtxPoolImpl - Added new tx: GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR
        2024-04-04 09:21:43,124 DEBUG [docker-executor-pool-109] c.w.d.ValidatorTransactionsExecutor - Start executing contract transaction 'AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g'
        2024-04-04 09:21:43,127 DEBUG [docker-executor-pool-137] c.w.d.ValidatorTransactionsExecutor - Start executing contract transaction 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR'
        2024-04-04 09:21:43,245 DEBUG [docker-executor-pool-109] c.w.d.ValidatorTransactionsExecutor - Built executed transaction 'Chdpm5LVbsxzzPQ1owyR2efqjQosa8KtYMhZzSxBuk54' for 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR'
        2024-04-04 09:21:43,254 DEBUG [docker-executor-pool-109] c.w.d.ValidatorTransactionsExecutor - Success contract execution for tx 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR'
        2024-04-04 09:21:45,169 DEBUG [docker-executor-pool-109] c.w.d.ValidatorTransactionsExecutor - Built executed transaction '3hm9wyBoebeWryLDwQ9LBqB2h4QrPQkkZyhoUanhYmxN' for 'AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g'
        2024-04-04 09:21:45,176 DEBUG [docker-executor-pool-109] c.w.d.ValidatorTransactionsExecutor - Success contract execution for tx 'AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g'
        2024-04-04 09:21:46,118 DEBUG [docker-executor-pool-109] c.w.d.ValidatorTransactionsExecutor - Start executing contract transaction 'AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g'
        2024-04-04 09:21:46,120 DEBUG [docker-executor-pool-108] c.w.d.ValidatorTransactionsExecutor - Start executing contract transaction 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR'
        2024-04-04 09:21:46,156 DEBUG [docker-executor-pool-109] c.w.d.ValidatorTransactionsExecutor - Built executed transaction '4DXvVutjDLWT14KapVe9rBaZuQUW6Dd5gMpAUoVw9YaN' for 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR'
        2024-04-04 09:21:46,162 DEBUG [docker-executor-pool-109] c.w.d.ValidatorTransactionsExecutor - Success contract execution for tx 'GKBPMZXN1MyxTGGRHYeMbCpQ9sct1mznHwpzHq78YEeR'
        2024-04-04 09:21:48,150 DEBUG [docker-executor-pool-109] c.w.d.ValidatorTransactionsExecutor - Built executed transaction 'F7WZiakPvDXApJ8MyFvnmQibjCBA92ivjWEVsQAv2jwq' for 'AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g'
        2024-04-04 09:21:48,156 DEBUG [docker-executor-pool-109] c.w.d.ValidatorTransactionsExecutor - Success contract execution for tx 'AkiQYVVtgAReEQgDGqWi6w92NZvHhGFvXUw6bNMKXN7g'

sleeps yield different execution order
    mul: FV5up1QoJHA5cXbFnbwVf5LfTMWWYXRMAGZ4rB95hWDo
    inc: 7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx

    miner container logs
        2zHM8b... on height 693: called set to 1
        ---------------
        FV5up1... on height 694: multiply(10): sleeping 2 seconds...
        7NXiBB... on height 694: increment(1): sleeping 0 seconds...
        FV5up1... on height 694: multiply(10): read counter value 1
        7NXiBB... on height 694: increment(1): read counter value 1
        7NXiBB... on height 695: increment(1): sleeping 0 seconds...
        7NXiBB... on height 695: increment(1): read counter value 10
    miner logs
        2024-04-04 10:14:28,570 DEBUG [tor.default-dispatcher-10] c.w.utx.UtxPoolImpl - Added new tx: 7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx
        2024-04-04 10:14:28,571 DEBUG [tor.default-dispatcher-23] c.w.utx.UtxPoolImpl - Added new tx: FV5up1QoJHA5cXbFnbwVf5LfTMWWYXRMAGZ4rB95hWDo
        2024-04-04 10:14:30,726 DEBUG [r-results-handler-pool-87] c.w.d.v.ContractValidatorResultsHandler - Contract validation for tx 'FV5up1QoJHA5cXbFnbwVf5LfTMWWYXRMAGZ4rB95hWDo' and key-block id '1a4tkZv9Xe4tvbSSQd77vbMPSGiGL4VCn9Xz8zEcPVLNerkEyPfW3x5ShgNge43dCGucp8YM1rz1r98QTwBGsrm' discarded, cause -  already in results store
        2024-04-04 10:14:31,105 DEBUG [miner-pool-104] c.w.d.MinerTransactionsExecutor - Start executing contract transaction 'FV5up1QoJHA5cXbFnbwVf5LfTMWWYXRMAGZ4rB95hWDo'
        2024-04-04 10:14:32,728 DEBUG [r-results-handler-pool-87] c.w.d.v.ContractValidatorResultsHandler - Contract validation for tx '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx' and key-block id '1a4tkZv9Xe4tvbSSQd77vbMPSGiGL4VCn9Xz8zEcPVLNerkEyPfW3x5ShgNge43dCGucp8YM1rz1r98QTwBGsrm' discarded, cause -  already in results store
        2024-04-04 10:14:33,110 DEBUG [miner-pool-104] c.w.d.MinerTransactionsExecutor - Start executing contract transaction '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'
        2024-04-04 10:14:33,138 DEBUG [miner-pool-104] c.w.d.MinerTransactionsExecutor - Built executed transaction 'EBYQUkAS6XuLedsnD4KTDkqVpPqPTvcfdEzuiHDiUc17' for 'FV5up1QoJHA5cXbFnbwVf5LfTMWWYXRMAGZ4rB95hWDo'
        2024-04-04 10:14:33,146 WARN  [miner-pool-105] c.w.d.MinerTransactionsExecutor - Suddenly not enough proofs for transaction '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'. Invalid validation proofs for results hash '<not provided>'. Actual '0', expected '1'.Current validators set: '3NopUHbfdwfsT4KtnbcKCkAuDqpnuSsUdFp'.
        2024-04-04 10:14:43,733 DEBUG [r-results-handler-pool-87] c.w.d.v.ContractValidatorResultsHandler - Contract validation for tx '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx' and key-block id '1a4tkZv9Xe4tvbSSQd77vbMPSGiGL4VCn9Xz8zEcPVLNerkEyPfW3x5ShgNge43dCGucp8YM1rz1r98QTwBGsrm' discarded, cause -  already in results store
        2024-04-04 10:14:48,734 DEBUG [r-results-handler-pool-87] c.w.d.v.ContractValidatorResultsHandler - Contract validation for tx '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx' and key-block id 'RFAvewNa4s3x6HA2s8nGVLsbcAhKicDvjTaCbSTWEPqEukRNMNRj1QzNSbchhi5f2exBbCdcXniAMc6Tmwyocax' discarded, cause -  already in results store
        2024-04-04 10:14:49,142 DEBUG [miner-pool-89] c.w.d.MinerTransactionsExecutor - Start executing contract transaction '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'
        2024-04-04 10:14:49,175 DEBUG [miner-pool-89] c.w.d.MinerTransactionsExecutor - Built executed transaction 'EaeSAs4EWPvKBofmAeuWNopMm1wBeHPryjk6WGb7BsXR' for '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'

    validator container logs
        2zHM8b... on height 693: called set to 1
        ---------------
        7NXiBB... on height 694: increment(1): sleeping 2 seconds...
        FV5up1... on height 694: multiply(10): sleeping 0 seconds...
        FV5up1... on height 694: multiply(10): read counter value 1
        7NXiBB... on height 694: increment(1): read counter value 10
        7NXiBB... on height 694: increment(1): sleeping 2 seconds...
        7NXiBB... on height 694: increment(1): read counter value 10
        7NXiBB... on height 695: increment(1): sleeping 2 seconds...
        7NXiBB... on height 695: increment(1): read counter value 10
    validator logs
        2024-04-04 10:14:29,115 DEBUG [utx-pool-sync-160] c.w.utx.UtxPoolImpl - Added new tx: 7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx
        2024-04-04 10:14:29,123 DEBUG [utx-pool-sync-160] c.w.utx.UtxPoolImpl - Added new tx: FV5up1QoJHA5cXbFnbwVf5LfTMWWYXRMAGZ4rB95hWDo
        2024-04-04 10:14:30,117 DEBUG [docker-executor-pool-113] c.w.d.ValidatorTransactionsExecutor - Start executing contract transaction '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'
        2024-04-04 10:14:30,119 DEBUG [docker-executor-pool-124] c.w.d.ValidatorTransactionsExecutor - Start executing contract transaction 'FV5up1QoJHA5cXbFnbwVf5LfTMWWYXRMAGZ4rB95hWDo'
        2024-04-04 10:14:30,152 DEBUG [docker-executor-pool-124] c.w.d.ValidatorTransactionsExecutor - Built executed transaction 'DNdnZ5Hs1N7v65br6DBmeAPQyZgHPCU6kDHjWzzVDBGw' for 'FV5up1QoJHA5cXbFnbwVf5LfTMWWYXRMAGZ4rB95hWDo'
        2024-04-04 10:14:30,158 DEBUG [docker-executor-pool-124] c.w.d.ValidatorTransactionsExecutor - Success contract execution for tx 'FV5up1QoJHA5cXbFnbwVf5LfTMWWYXRMAGZ4rB95hWDo'
        2024-04-04 10:14:32,150 DEBUG [docker-executor-pool-124] c.w.d.ValidatorTransactionsExecutor - Built executed transaction '66bDqCmUALNtdpf3KksLtTpj2y92vD1ggTKvmfKf7sqt' for '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'
        2024-04-04 10:14:32,156 DEBUG [docker-executor-pool-124] c.w.d.ValidatorTransactionsExecutor - Success contract execution for tx '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'
        2024-04-04 10:14:41,633 DEBUG [docker-executor-pool-123] c.w.d.ValidatorTransactionsExecutor - Start executing contract transaction '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'
        2024-04-04 10:14:43,655 DEBUG [docker-executor-pool-123] c.w.d.ValidatorTransactionsExecutor - Built executed transaction '9iNDMPyD4vc2SJEpgeG5z9YP2L7yVCqDTJhnUPLPLnN4' for '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'
        2024-04-04 10:14:43,659 DEBUG [docker-executor-pool-123] c.w.d.ValidatorTransactionsExecutor - Success contract execution for tx '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'
        2024-04-04 10:14:46,147 DEBUG [docker-executor-pool-123] c.w.d.ValidatorTransactionsExecutor - Start executing contract transaction '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'
        2024-04-04 10:14:48,177 DEBUG [docker-executor-pool-123] c.w.d.ValidatorTransactionsExecutor - Built executed transaction '3H5THTGbkcUrNNz5mzUTgwzYENRhh5faNKJa1y1acdgj' for '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'
        2024-04-04 10:14:48,182 DEBUG [docker-executor-pool-123] c.w.d.ValidatorTransactionsExecutor - Success contract execution for tx '7NXiBBjHmDfGqZJCwYu2szaUcbEApFHFkDYrPf2ZPzvx'
*/