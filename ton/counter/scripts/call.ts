import { Address, toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { getClient, getSender } from "./common";

export async function run() {
    const client = await getClient("local");
    const sender = await getSender(client, "main resource evidence world audit lake play action side assault awful economy thank fancy decline woman roast punch wait marriage next subway isolate twenty", true);

    const counterAddress = Address.parse("EQA_KTHbze8hyF1YvkrxDkepkadZWKnbu8FSSZXEYlW4cUpY");
    const counter = client.open(Counter.createFromAddress(counterAddress));

    return counter.sendSet(sender, 0);
}

if (require.main === module) {
    run().then(() => {
        console.log("Success");
    }).catch((err) => {
        console.error(err)
    });
}
