import {SingletonItem} from "../Base/SingletonItem";
import {EItemType} from "../../Define/ItemDefine";
import {BaseAttr} from "../Base/BaseItem";
import {AdventureMsg} from "../../Define/MsgDefine";
import {ETaskState} from "../../Define/TaskDefine";
import {AdventureConfig, GetAdventureConfig} from "../Configs/AdventureConfig";
import {AttrChanged, AttrSetter} from "../Base/ItemDecorator";

class AdventureBaseAttr extends BaseAttr {

    private _stage: number;
    public get stage(): number {
        return this._stage;
    }

    private _task_states: ETaskState[];

    public GetTaskCount(): number {
        return this._task_states.length;
    }

    public GetTaskState(index: number): ETaskState {
        return this._task_states[index];
    }

    @AttrChanged
    public SetTaskState(index: number, state: ETaskState): void {
        this._task_states[index] = state;
    }

    @AttrChanged
    public ToNextStage(sData: AdventureMsg): void {
        this._stage = sData.stage;
        this._task_states = sData.task_states;
    }

    constructor(sData: AdventureMsg, owner: AdventureItem) {
        super(owner);
        this._stage = sData.stage;
        this._task_states = sData.task_states;
    }
}

export class AdventureItem extends SingletonItem {
    declare readonly base: AdventureBaseAttr;
    declare readonly config?: AdventureConfig;

    public get ItemType(): EItemType {
        return EItemType.Adventure;
    }

    constructor(sData: AdventureMsg) {
        super();
        this.base = new AdventureBaseAttr(sData, this);
        this.config = GetAdventureConfig(this.base.stage);
    }

}