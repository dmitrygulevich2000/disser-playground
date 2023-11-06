import {
  Action,
  Contract,
  ContractMapping,
  ContractValue,
  IncomingTx,
  JsonVar,
  logger,
  Param,
  Params,
  Tx,
  Var,
} from '@wavesenterprise/contract-core'
import BN from 'bn.js'

@Contract()
export default class Hello {
  @Var()
  counter!: ContractValue<number>


  @Action({ onInit: true })
  init(@Param('init') initial_counter) {
    this.counter.set(initial_counter)
  }

  @Action({ preload: ['counter'] })
  async increment(@Param('by') by: number) {
    const counter = await this.counter.get()
    this.counter.set(counter + by)
  }

  @Action({ preload: ['counter'] }) 
  async get(): Promise<number> {
    const counter = await this.counter.get()
    return counter
  }
}
