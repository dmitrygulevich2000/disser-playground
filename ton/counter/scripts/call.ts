import { Address, toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { getClient, getSender } from "./common";

export async function run() {
    const client = await getClient("local");
    const sender = await getSender(client, "3424db8f21c09343158da80c689eec8b3d03bef106bd0483d25eec55057cad21d99b9b5cbe4dc2810e529c9646af105874f4ee838299dd6de1fd7b8b08843758");

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
