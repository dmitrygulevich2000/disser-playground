import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode, toNano } from '@ton/core';

export type CounterConfig = {
    counter: number;
};

export function counterConfigToCell(config: CounterConfig): Cell {
    return beginCell().storeUint(config.counter, 256).endCell();
}

export const Opcodes = {
    increase: 0x7e8764ef,
    multiply: 0x6f6bc17a,
    set: 0x86e2aa9f,
};

const defaultValue = toNano('0.2');

export class Counter implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) { }

    static createFromAddress(address: Address) {
        return new Counter(address);
    }

    static createFromConfig(config: CounterConfig, code: Cell, workchain = 0) {
        const data = counterConfigToCell(config);
        const init = { code, data };
        return new Counter(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendIncrease(
        provider: ContractProvider,
        via: Sender,
        by: number,
        queryID: number = 0
    ) {
        await provider.internal(via, {
            value: defaultValue,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.increase, 32)
                .storeUint(queryID, 64)
                .storeUint(by, 256)
                .endCell(),
        });
    }
    async sendMultiply(
        provider: ContractProvider,
        via: Sender,
        by: number,
        queryID: number = 0,
    ) {
        await provider.internal(via, {
            value: defaultValue,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.multiply, 32)
                .storeUint(queryID, 64)
                .storeUint(by, 256)
                .endCell(),
        });
    }
    async sendSet(
        provider: ContractProvider,
        via: Sender,
        counter: number,
    ) {
        await provider.internal(via, {
            value: defaultValue,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.set, 32)
                .storeUint(0, 64)
                .storeUint(counter, 256)
                .endCell(),
        });
    }

    async getCounter(provider: ContractProvider) {
        const result = await provider.get('get_counter', []);
        return result.stack.readNumber();
    }
}
