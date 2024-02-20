import { Address, toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { getClient, getSender, sleep } from "./common";

export async function run() {
    const client = await getClient("local");
    
    const sender_one = async () => getSender(client, "record this current hello wrap number spike casual tired amateur wait humble ivory boost inhale chronic enough shift hello hello oppose elite gym gap", true);
    const sender_two = async () => getSender(client, "wrap honey weapon pink story human dentist oyster knock kite attract never long meadow edge disagree region sadness movie top raw close puppy demand", true);
    const counterAddress = Address.parse("EQA_KTHbze8hyF1YvkrxDkepkadZWKnbu8FSSZXEYlW4cUpY");
    const counter = client.open(Counter.createFromAddress(counterAddress));

    // counter is 0
    
    for (let i = 0; i < 5; i += 1) {
        await counter.sendIncrease(await sender_one(), 1, i);
        console.log("sent +1");
        await sleep(1000);
    }

    for (let i = 0; i < 2; i += 1) {
        await counter.sendMultiply(await sender_two(), 100, 5+i);
        console.log("sent *100");
        await sleep(1000);
    }

    // counter is 100 after long time :9(
}

if (require.main === module) {
    run().then(() => {
        console.log("Success");
    }).catch((err) => {
        console.error(err)
    });
}