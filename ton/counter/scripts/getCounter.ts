import { Address } from "@ton/ton";
import { Counter } from "../wrappers/Counter";
import { getClient } from "./common";

export async function run() {
    const client = await getClient("local");

    const counterAddress = Address.parse("EQA_KTHbze8hyF1YvkrxDkepkadZWKnbu8FSSZXEYlW4cUpY");
    const counter = new Counter(counterAddress);
    const counterContract = client.open(counter);

    const counterValue = await counterContract.getCounter();
    console.log("value:", counterValue.toString());
}

if (require.main === module) {
    run().then(() => {
        console.log("Success");
    }).catch((err) => {
        console.error(err)
    });
}