//Manager for tickers
//TODO handles add and remove during update(trigger), consult EventMgr

import {ObjPool} from "../Common/ObjPool";
import {NextId} from "./IdMgr";
import {BaseTickGroup} from "./Timer/BaseTickGroup";
import {Ticker} from "./Timer/Ticker";
import {DefaultTickGroup} from "./Timer/DefaultTickGroup";
import {BatchTickGroup} from "./Timer/BatchTickGroup";
import {TickFunc} from "../Common/Const";
import {WaitContainer} from "./WaitContainer";

/**
 * different intervals(ms)
 * each represents a group, be in increasing order
 * last 0 is fallback
 */
const _TickIntervals = [1000, 10000, 60000, 0];

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

/**
 * is now updating? during this add and remove should be suspended,
 * to avoid bugs like adding/removing handlers in handler functions
 */
let _isUpdating = false;

/**
 * tickers waiting for add or removal
 */
let _Wait: WaitContainer<number, Ticker>

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
    _Wait = new WaitContainer<number, Ticker>()
}

/**
 * add ticker to suitable group
 * @param ticker
 * @constructor
 */
function AddToBestGroup(ticker: Ticker): void {
    let belongGroup: BaseTickGroup = undefined
    //ticker should stop
    if (ticker.tick_count == 0) {
        belongGroup = undefined
    } else {
        for (const tickGroup of _AllTickGroups) {
            if ((ticker.leftTime >= tickGroup.leftTime
                    && ticker.interval <= tickGroup.interval)
                || tickGroup.interval == 0) {
                belongGroup = tickGroup
                break
            }
        }
    }
    //if group is not changed, do nothing
    if (ticker.group === belongGroup) {
        return
    }
    // console.log(`${ticker.id} added to group ${belongGroup.interval}`)
    //remove from old group
    if (ticker.group) {
        ticker.group.RemoveTicker(ticker.id)
    }
    //add to new group
    if (belongGroup != undefined) {
        belongGroup.AddTicker(ticker);
    }
}

function AddTimer(interval: number, func: TickFunc, tick_count: number): number {
    let id = NextId();
    let ticker = _TickerPool.Get();
    ticker.init(id, interval, func, tick_count);
    _AllTicker.set(id, ticker);

    if (!_isUpdating) {
        AddToBestGroup(ticker)
    } else {
        _Wait.Add(id, ticker)
    }

    return id
}

/**
 * add a ticker which executes every interval(ms)
 * @param interval (ms) time interval between two function calls
 * @param func tick function, remember to call bind(this) if this is needed
 * @return unique ticker id, can be used to RemoveTimer
 * @constructor
 */
export function AddTickTimer(interval: number, func: TickFunc): number {
    return AddTimer(interval, func, -1);
}

/**
 * execute function once after delay(ms)
 * @param delay delay time before execution
 * @param func execute function, remember to call bind(this) if this is needed
 * @constructor ticker id, can be used to RemoveTimer
 */
export function AddDelayTimer(delay: number, func: TickFunc): number {
    return AddTimer(delay, func, 1);
}

export function InnerRemoveTimer(id: number) {
    let ticker = _AllTicker.get(id);
    if (!ticker) {
        return;
    }
    ticker.group.RemoveTicker(id);
    _AllTicker.delete(id);
    _TickerPool.Set(ticker);
}

/**
 * remove ticker by id
 * @param id unique ticker id
 * @return 0, so it can be called like this._timerId = RemoveTimer(this._timerId)
 * @constructor
 */
export function RemoveTimer(id: number): number {
    if (id == 0) {
        return 0;
    }
    if (!_isUpdating) {
        InnerRemoveTimer(id)
    } else {
        _Wait.Remove(id)
    }

    return 0;
}

/**
 * Drive all tickers DO NOT CALL!!!
 * @param deltaTime
 * @constructor
 */
export function Update(deltaTime: number) {
    _isUpdating = true

    //update group
    _AllTickGroups.forEach(tickGroup => {
        tickGroup.Update(deltaTime);
    });
    //put all triggered tickers in suitable group
    _AllTickGroups.forEach(tickGroup => tickGroup.ProcessUpdated(AddToBestGroup));

    _isUpdating = false;

    //waiting remove
    _Wait.ProcessRemove(InnerRemoveTimer);
    //waiting add
    _Wait.ProcessAdd((_, val) => AddToBestGroup(val))
}

