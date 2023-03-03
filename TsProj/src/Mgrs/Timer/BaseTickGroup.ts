import {Ticker} from "./Ticker";
import {it} from "node:test";

type TickerProc = (ticker: Ticker) => void;

/**
 * group of tickers, for performance optimization
 * TODO analyse gc and practical effect
 */
export abstract class BaseTickGroup {
    private readonly _tickers: Map<number, Ticker>
    private readonly _updated: Ticker[]

    protected constructor(readonly index: number) {
        this._tickers = new Map<number, Ticker>()
        this._updated = []
    }

    abstract get leftTime(): number;

    abstract get interval(): number;

    abstract Update(deltaTime: number): void

    /**
     * all tickers pass through a period of deltaTime, then should be regrouped
     * @param deltaTime passes time
     * @constructor
     * @protected
     */
    protected UpdateTickers(deltaTime: number) {
        // console.log(`Update group ${this.interval}`)
        this._tickers.forEach((ticker) => {
            ticker.update(deltaTime)
            this._updated.push(ticker)
        })
        // this._tickers.clear()
    }

    AddTicker(ticker: Ticker) {
        this._tickers.set(ticker.id, ticker)
        ticker.group = this
        //compensate left time
        ticker.compensate(this.interval - this.leftTime)
    }

    RemoveTicker(id: number) {
        const ticker = this._tickers.get(id)
        if (!ticker){
            throw new Error(`$handler ${id} not in group ${this.interval}`)
        }
        ticker.group = undefined
        this._tickers.delete(id);
    }

    ProcessUpdated(func: TickerProc) {
        while (this._updated.length > 0) {
            const ticker = this._updated.pop()
            func(ticker)
        }
    }
}