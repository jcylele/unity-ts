/**
 * represents a prop item
 */

import {BaseAttr, BaseItem} from "../Base/BaseItem";
import {PropItemMsg} from "../../Define/MsgDefine";
import {EItemType} from "../../Define/ItemDefine";
import {GetPropConfig, PropConfig} from "../Configs/PropConfig";
import {GetBag} from "../../Mgrs/ItemMgr";
import {AttrSetter} from "../Base/ItemDecorator";

class PropBaseAttr extends BaseAttr {
    private readonly _id: number
    public get id(): number {
        return this._id;
    }

    private _count: number
    public get count(): number {
        return this._count;
    }

    @AttrSetter
    public set count(val: number) {
        this._count = val
    }

    constructor(sData: PropItemMsg, owner: BaseItem) {
        super(owner)
        this._id = sData.id;
        this._count = sData.count;
    }
}

export class PropItem extends BaseItem {
    declare readonly base: PropBaseAttr;
    declare readonly config?: PropConfig;

    public get ItemType(): EItemType {
        return EItemType.Prop
    }

    get Key(): number {
        return this.base.id;
    }


    constructor(sData: PropItemMsg) {
        super();
        this.base = new PropBaseAttr(sData, this);
        this.config = GetPropConfig(this.base.id);
    }

    addCount(n: number): number {
        this.base.count += n;
        return this.base.count;
    }

    useCount(n: number): number {
        if (n > this.base.count) {
            throw new Error(`Use Count ${n} > Own Count ${this.base.count}, id: ${this.base.id}`);
        }
        this.base.count -= n;
        if (this.base.count == 0) {
            //移除
            GetBag(this.ItemType).Remove(this);
        }
        return this.base.count;
    }
}

