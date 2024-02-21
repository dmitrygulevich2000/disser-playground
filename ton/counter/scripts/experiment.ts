import { Address, toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { getClient, getSender, sleep } from "./common";

export async function run() {
    const client = await getClient("local");
    
    const sender_one = async () => getSender(client, "da264577500b74d5f74866f52840b51fbfd176495e81284c1b3795451cae7199e9552b55c471b7d14014a6eb719ea0e4ee7d1c537afcb431ef96738274d31b81");
    const sender_two = async () => getSender(client, "ada3fd75f7e89371161a15f8c5542b402b2c4b86fbfdd9efdd4c7823fff6530b087b0b5655abb4a76c9528dfc1d9c9cde256dd51569f07ea3f96ef5dab32844f");
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

    // counter is 100 after long time :(
}

if (require.main === module) {
    run().then(() => {
        console.log("Success");
    }).catch((err) => {
        console.error(err)
    });
}