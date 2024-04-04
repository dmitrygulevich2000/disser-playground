import {
  Action,
  Contract,
  ContractMapping,
  ContractValue,
  IncomingTx,
  ExecutionContext,
  JsonVar,
  logger,
  Param,
  Params,
  Tx,
  Var,
  Ctx,
} from '@wavesenterprise/contract-core'

import fs from 'node:fs';

@Contract()
export default class Hello {

  @Var() counter!: ContractValue<number>

  @Action({ onInit: true })
  async init(@Param('init') initial_counter: number, @Ctx() ctx: ExecutionContext) {
    console.log(`called init with ${initial_counter}`)
    this.counter.set(initial_counter)
  }

  @Action()
  async increment(@Param('by') by: number, @Ctx() ctx: ExecutionContext) {
    let sleep_secs = 0
    try {
      const data = fs.readFileSync('/usr/app/inc_sleep', 'utf8')
      const secs = parseInt(data)
      if (!Number.isNaN(parseInt(data))) {
        sleep_secs = secs
      }
    } catch (err) {
    }
    this.log(ctx, `increment(${by}): sleeping ${sleep_secs} seconds...`)
    await new Promise(r => setTimeout(r, sleep_secs * 1000))
    
    const counter = await this.counter.get()
    this.log(ctx, `increment(${by}): read counter value ${counter}`)

    this.counter.set(counter + by)
  }

  @Action()
  async multiply(@Param('by') by: number, @Ctx() ctx: ExecutionContext) {
    let sleep_secs = 0
    try {
      const data = fs.readFileSync('/usr/app/mul_sleep', 'utf8')
      const secs = parseInt(data)
      if (!Number.isNaN(parseInt(data))) {
        sleep_secs = secs
      }
    } catch (err) {
    }
    this.log(ctx, `multiply(${by}): sleeping ${sleep_secs} seconds...`)
    await new Promise(r => setTimeout(r, sleep_secs * 1000))
    
    const counter = await this.counter.get()
    this.log(ctx, `multiply(${by}): read counter value ${counter}`)


    this.counter.set(counter * by)
  }

  ///////////////////////////////////////////////////////////////////////////////

  @Action()
  async decrement(@Param('by') by: number, @Ctx() ctx: ExecutionContext) {
    const counter = await this.counter.get()
    this.log(ctx, `decrement(${by}): read counter value ${counter}`)

    await new Promise(r => setTimeout(r, 5000))  // wait for set happens
    if (counter >= by) {
      this.counter.set(counter - by)
    }
  }

  @Action()
  async set(@Param('to') to: number, @Ctx() ctx: ExecutionContext) {
    this.log(ctx, `called set to ${to}`)

    await new Promise(r => setTimeout(r, 2000))  // wait for decrement start
    this.counter.set(to)
    console.log(`---------------`)
  }

  ///////////////////////////////////////////////////////////////////////////////

  log(ctx: ExecutionContext, message: string) {
    console.log(`${ctx.tx.id.slice(0, 6)}... on height ${ctx.blockInfo.height}: ${message}`)
  }
}
