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
  async init(@Param('init') initial_counter: number) {
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

  @Action()
  async decrement(@Param('by') by: number) {
    this.log.info(`called decrement by ${by}`)
    console.log('called decrement by %d', by)

    const counter = await this.counter.get()
    this.log.info(`read counter value ${counter}`)
    console.log('read counter value %d', counter)
    
    await new Promise(r => setTimeout(r, 5000))  // wait for set happens
    if (counter >= by) {
      this.counter.set(counter - by)
    }
  }

  @Action()
  async set(@Param('to') to: number) {
    this.log.info(`called set to ${to}`)
    console.log('called set to %d', to)

    await new Promise(r => setTimeout(r, 2000))  // wait for decrement start
    this.counter.set(to)
  }
}
