import { toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { compile } from '@ton/blueprint';

import { getClient, getSender } from './common';

export async function run() {
    const client = await getClient("local");
    const sender = await getSender(client, "3424db8f21c09343158da80c689eec8b3d03bef106bd0483d25eec55057cad21d99b9b5cbe4dc2810e529c9646af105874f4ee838299dd6de1fd7b8b08843758");

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