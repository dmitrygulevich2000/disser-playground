import { Address, toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { getClient, getSender, sleep } from "./common";

const ACCOUNTS = [
    "b9ffdf631b4a6d407309f4d3efd310783904bf6de62ce1ce7b28fab0d6a38d77bd0928b83d1afcc5a442a961b6b68d901bd81a1c812c0654c983d901efa968a6",
    // 1391
    "a48ad4d8d3915a4b9a2b94dd4886f002ac711cb0af7d3a636ba58b3e38691c35e942cbeea9c6611cabafc1ad3c217b16d3ca5dfbb619ecae59aa231d5841aba9",
    // 1389
    "6d222d4cfb7267ad46844a0f058ec34e57bd9828817ef0af8b8d5a2040daff10a2f9431cd36320627b2c179fb9530848f7b9fe65d58f4474055b5a88475d4ff2",
    // 1389
    "8857df203b6cb4edd5c12e629dfd4bcff5dd23e41cfa5f02719578e698e11a960054d85499a8cb24bdaa297003e4db1c62b3e1057f25ffa46a7de1a6cb64d3e2",
    // 1391
    "45c1d552cd4664a2cb1cbc2955a52619dd0ef76d133148b625cc424a82720ac19d0a9414d8c534f7955aa69a2cfa4977ad2f58c63bf740af6928de5038e90bb6",
    // 1389
    "5acf2b25a0dee1494ceda2bd4b62d97a70fb7cef5f20cef30ff2555e0522dd1310f20039ac703703a35ebee1377ba2f313d36f896d8aa93db626d4276fd2fd74",
    // 1391
    "bc3c7c3f3d93631e81c747bd3899650a3553132bbaa619bcc3bbd27d86512cb3c53ea96144b6c4fed5575c8e768ed9cbb92b6854897941884e46ce42b5ceaec1",
    // 1391
    "a28d2717e0cefc4e232f2a4c0af26f415a64a27ef7ed1b627b6ebf470a6c9a167725d942504555a72fb5d1b482aede269c05ad7385c9e7b27790fd05060832c0",
    // 1391
    "3a05318e0898b30788376238867f707d223ed94c38d0d06cbb569578ecebef22118d54576d190224cb96c76892a8d3395b3da35032eb06703fa669e67abde964",
    // 1389
    "21d935a949e3f912d6891c4bd9e38b35c9379ad21610198c5a198dbf1be71f21df2356f493531412e8bf883cd652fe13c554a98433b24d02a624749bdb093b18",
    // 1391
    "2c08027283edd5b0d39f0bd7adf8666e3bd5a9051a2f5e6015c43c9854ee3b53ac1e053ae86764bf769fb2236e5eb6896066cc76fe08c2217ae1c29ec3dbd504",
    // 1391
    "2d13cd6cc28809a7d5f0001275c0a13b1db5c909f0b9736ac525393558c5874c1fc558d8e13ff9f49480f36ac86542843245cdd3c19a25a9dc8eda7513582a38",
    // 1389
    "6b8973eca58ce8b7ae2599c28bf2dac41df973f4f35c648a22355d20ba32f615d45f6801eefd40a5384947ba2a6eda7f654d6273bca5bf7343f26a64031e61e2",
    // 1389
    "0ae676c0c0bed12f2fbdeb5d4d296a665fe7d832be99cafd26f0e08e540b78487c05dfdc9145d624f43b47637618626f16a3ff131468838ca04661359791f075",
    // 1389
    "95e8d7509bac889fcac521a11b0ec5fc0d0d088c60523c5c527a071fd098259be3fcec70a72a83ca65167a7a08d1dc7c72365bef335a971854eab1c8b091f831",
    // 1389
    "68f61d0cb84160ebe64db9f08a5db94112985cd32adb9fb61a37435578522160007e09a334f554e093a0963518ec26baee0c4b078434d1c33e96e353dece0005",
    // 1392
    "787b9f0143018d00bfa57a34951118c27e72008867b53ae2c513d19969e4d1b82af5b04c4685d929a2f2ef42017fed5f8f094eb74bcbb28bb948574059087519",
    // 1392
    "22ce4de031921b183bfa9731b935d91b4dc0379d11a619cc3b39609636cd273dc7821ea77fae172186c512f5f39810baf87299f41c37ab5d5c9dc7ebbfcbec43",
    // 1392
    "c5defbd1914a3c5fb0d17f61ed32701eb1371d5c7f7da49f6c3c68d375fa745e20a0c84bc82ba398ec2c60e094aac6b396d71db44ae954420d3e8cc871d7716b",
    // 1392
    "524e71b96e70df2f9493245e05a6f86b5e4cff3e32ef271ea3993b63163047f4469635f234396afdf85d045ff96bf30444b432872a0d4ead73d3e25162f9915e",
    // 1390

    "3dcca9425340152150f163485c2ef75a679e9cae5902f3373082f743f42353f5379eaab42047054ad13c8e0ac6350424f83190ebd99574dbeda854af5bda6604",
    // 1392
    "9cf6c1d3bd0aa229c0c173899637f1b4af092bbf2b54ef789a8840b008242a239d9a84ad3d724deb16398eab36850f0802690a57d73e1af0f87eff0a7dbf4d0e",
    // 1392
    "b55d904428ee947092d7d68432c633926337db7b9e3529860b946e63f1cb3daad37cc4050b504ef9db293d55effa22b4fe9023259f540122eb324611b53eb1a8",
    // 1390
    "9f3fa30485adf4f8edc57c360a957920a5de555e9e278032adee699448f30c592d106d7d293e63a29d73ed8e44646cf8aff81c77b62069d5f0fb68631c1b209a",
    // 1392
]

// 809000102
// доставка:
// 1389 +1 x8
// 1390 +1    *100 x1 -> *100 +1
// 1391 +1 x7
// 1392 +1 x4 *100 x3 -> +1 *100 *100 +1 *100 +1 +1

export async function run() {
    const client = await getClient("local");

    const counterAddress = Address.parse("EQA_KTHbze8hyF1YvkrxDkepkadZWKnbu8FSSZXEYlW4cUpY");
    const counter = client.open(Counter.createFromAddress(counterAddress));

    // counter is 0

    const INC_COUNT = 20;
    const MUL_COUNT = 4;

    for (let i = 0; i < INC_COUNT; i += 1) {
        const sender = await getSender(client, ACCOUNTS[i]);
        await counter.sendIncrease(sender, 1);
        console.log("sent +1");
    }

    for (let i = 0; i < MUL_COUNT; i += 1) {
        const sender = await getSender(client, ACCOUNTS[INC_COUNT + i]);
        await counter.sendMultiply(sender, 100);
        console.log("sent *100");
    }

    // counter is 809000102
    // msg order:
    // +1 x8 
    // *100
    // +1 x9
    // *100
    // *100
    // +1 x1
    // *100
    // +1 x2
}

if (require.main === module) {
    run().then(() => {
        console.log("Success");
    }).catch((err) => {
        console.error(err)
    });
}