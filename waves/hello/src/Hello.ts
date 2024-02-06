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

@Contract()
export default class Hello {
  log = logger(this)

  @Var() counter!: ContractValue<number>

  @Action({ onInit: true })
  init(@Param('init') initial_counter: number) {
    this.log.info(`called init with ${initial_counter}`)
    console.log('called init with %d', initial_counter)

    this.counter.set(initial_counter)
  }

  @Action()
  async increment(@Param('by') by: number) {
    this.log.info(`called increment by ${by}`)
    console.log('called increment by %d', by)

    const counter = await this.counter.get()
    this.counter.set(counter + by)
  }
}
