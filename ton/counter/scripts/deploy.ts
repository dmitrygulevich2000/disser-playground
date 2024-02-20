import { toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { compile, NetworkProvider } from '@ton/blueprint';

import { getClient, getSender } from './common';

export async function run() {
    const client = await getClient("local");
    const sender = await getSender(client, "main resource evidence world audit lake play action side assault awful economy thank fancy decline woman roast punch wait marriage next subway isolate twenty", true);

    const counter = client.open(
        Counter.createFromConfig(
            {
                counter: 0,
            },
            await compile('Counter')
        )
    );

    console.log("contract address", counter.address)

    return counter.sendDeploy(sender, toNano('1'));
}

if (require.main === module) {
    run().then(() => {
        console.log("Success");
    }).catch((err) => {
        console.error(err)
    });
}