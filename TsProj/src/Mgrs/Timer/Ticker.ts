import {IPoolable} from "../../Common/ObjPool";
import {TickFunc} from "../../Common/Const";
import {BaseTickGroup} from "./BaseTickGroup";

/**
 * ticker object, represents a function executed periodically
 */
export class Ticker implements IPoolable {

    private _leftTime: number = -1;
    private _id : number = -1;
    private _interval: number = -1;
    private _func?: TickFunc
    private _tick_count: number = -1

    group: BaseTickGroup

    public get id() : number {
        return this._id;
    }

    public get leftTime(): number{
        return this._leftTime
    }

    public get interval() : number {
        return this._interval;
    }

    public get tick_count(): number{
        return this._tick_count
    }

    compensate(time: number){
        this._leftTime += time;
    }

    init(id: number, interval : number, func : TickFunc, tick_count: number) : void {
        this._id = id;
        this._interval = interval;
        this._func = func;

        this._leftTime = interval;
        this.group = undefined

        this._tick_count = tick_count
    }

    reset(): void {
        this._id = -1;
        this._interval = -1;
        this._func = undefined;
        this._leftTime = -1;
        this.group = undefined
        this._tick_count = -1
    }

    update(deltaTime: number) {
        this._leftTime -= deltaTime;
        if (this._leftTime > 0) {
            return;
        }

        //just reset, will cause margin error, but fine
        this._leftTime = this._interval;

        if (this._func) {
            this._func();
        }

        this._tick_count--;
    }
}