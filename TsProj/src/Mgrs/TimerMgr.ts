//Manager for tickers
//TODO handles add and remove during update(trigger), consult EventMgr

import {ObjPool} from "../Common/ObjPool";
import {NextId} from "./IdMgr";
import {BaseTickGroup} from "./Timer/BaseTickGroup";
import {Ticker} from "./Timer/Ticker";
import {DefaultTickGroup} from "./Timer/DefaultTickGroup";
import {BatchTickGroup} from "./Timer/BatchTickGroup";
import {TickFunc} from "../Define/Const";

/**
 * different intervals(ms)
 * each represents a group, be in increasing order
 * last 0 is fallback
 */
const _TickIntervals = [500, 1000, 10000, 60000, 0];
/**
 * tick groups
 */
const _AllTickGroups: BaseTickGroup[] = []
/**
 * all tickers, key is the unique ticker id
 */
const _AllTicker = new Map<number, Ticker>()
/**
 * a pool of tickers
 */
let _TickerPool: ObjPool<Ticker>

export function Init() {
    _AllTicker.clear();
    _TickIntervals.forEach((interval, index) => {
        if (interval == 0) {
            _AllTickGroups.push(new DefaultTickGroup(index))
        } else {
            _AllTickGroups.push(new BatchTickGroup(index, interval))
        }
    });
    _TickerPool = new ObjPool<Ticker>(Ticker)
}

/**
 * add ticker to best-fit group
 * @param ticker
 * @constructor
 */
function AddToBestGroup(ticker: Ticker): void {
    //must be in reverse order, or all ticker will be in default group
    for (const tickGroup of _AllTickGroups) {
        if ((ticker.leftTime >= tickGroup.leftTime
                && ticker.interval <= tickGroup.interval)
            || tickGroup.interval == 0) {
            //if group is not changed, do nothing
            if (ticker.group !== tickGroup){
                console.log(`${ticker.id} added to group ${tickGroup.interval}`)
                if (ticker.group){
                    ticker.group.RemoveTicker(ticker.id)
                }
                tickGroup.AddTicker(ticker);
            }
            break
        }
    }
}

/**
 * add a ticker (a function being called periodically)
 * @param interval (ms) time interval between two function calls
 * @param func tick function, remember to call bind(this) if this is needed
 * @return unique ticker id, can be used to RemoveTimer
 * @constructor
 */
export function AddTimer(interval: number, func: TickFunc): number {
    let id = NextId();
    let ticker = _TickerPool.Get();
    ticker.init(id, interval, func);
    _AllTicker.set(id, ticker);

    AddToBestGroup(ticker);

    return id;
}

/**
 * remove ticker by id
 * @param id unique ticker id
 * @return 0, so it can be called like this._timerId = RemoveTimer(this._timerId)
 * @constructor
 */
export function RemoveTimer(id: number): number {
    if (id == 0) return 0;
    let ticker = _AllTicker.get(id);
    if (!ticker) {
        return 0;
    }
    ticker.group.RemoveTicker(id);
    _AllTicker.delete(id);
    _TickerPool.Set(ticker);
    return 0;
}

/**
 * Drive all tickers DO NOT CALL!!!
 * @param deltaTime
 * @constructor
 */
export function Update(deltaTime: number) {
    //update group
    _AllTickGroups.forEach(tickGroup => {
        tickGroup.Update(deltaTime);
    });
    //put all triggered tickers in suitable group
    _AllTickGroups.forEach(tickGroup => tickGroup.ProcessUpdated(AddToBestGroup));
}

