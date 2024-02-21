import { getHttpEndpoint, Config } from "@orbs-network/ton-access";
import { WalletContractV3R2, WalletContractV4, TonClient } from "@ton/ton";
import { mnemonicToWalletKey, keyPairFromSecretKey, KeyPair } from "ton-crypto";

export async function getClient(network: "testnet" | "mainnet" | "local" = "testnet") {
    let endpoint = "http://127.0.0.1:8081/jsonRPC";
    if (network != "local") {
        endpoint = await getHttpEndpoint({ network: "testnet" });
    }
    return new TonClient({ endpoint });
}

export async function getSender(client: TonClient, mnemonicOrSecretKey: string) {
    const isLocal = (mnemonicOrSecretKey.length == 128);
    if (mnemonicOrSecretKey.split(" ").length != 1) {
        return Promise.reject("secret key expected to be 64-byte hex string")
    }
    
    let key: KeyPair;
    if (isLocal) {
        key = keyPairFromSecretKey(Buffer.from(mnemonicOrSecretKey, 'hex'));
    } else {
        key = await mnemonicToWalletKey(mnemonicOrSecretKey.split(" "));
    }

    let wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    if (isLocal) {
        wallet = WalletContractV3R2.create({ publicKey: key.publicKey, workchain: 0, walletId: 42 });
    }

    if (!await client.isContractDeployed(wallet.address)) {
        return Promise.reject("wallet is not deployed")
    }

    const walletContract = client.open(wallet);
    return walletContract.sender(key.secretKey);
}

export async function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}
