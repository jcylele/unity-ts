import {Ticker} from "./Ticker";
import {BaseTickGroup} from "./BaseTickGroup";

/**
 * group of tickers, for performance optimization
 * TODO analyse gc and practical effect
 */
export class BatchTickGroup extends BaseTickGroup {

    private _leftTime: number

    constructor(readonly index: number, readonly _interval: number) {
        super(index);
        this._leftTime = this._interval;
    }

    get leftTime(): number {
        return this._leftTime
    }

    get interval(): number {
        return this._interval
    }

    Update(deltaTime: number) {
        this._leftTime -= deltaTime;
        if (this._leftTime > 0) {
            return;
        }

        //just reset, will cause margin error, but fine
        this._leftTime = this._interval;
        //tick
        this.UpdateTickers(this._interval)
    }
}