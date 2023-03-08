/**
 * represents a prop item
 */

import BaseItem from "../Base/BaseItem";
import { PropItemMsg } from "../../Define/MsgDefine";
import {EItemType} from "../../Define/ItemDefine";
import {GetPropConfig, PropConfig} from "../Configs/PropConfig";
import {GetBag} from "../../Mgrs/ItemMgr";

export class PropItem extends BaseItem {
    declare readonly config?: PropConfig;
    public get ItemType(): EItemType {
        return EItemType.Prop
    }
    get Key(): number {
        return this._id;
    }
    private readonly _id: number
    public get id(): number {
        return this._id;
    }
    private _count: number
    public get count(): number {
        return this._count;
    }

    constructor(sData: PropItemMsg) {
        super();
        this._id = sData.id;
        this._count = sData.count;
        this.config = GetPropConfig(this._id);
    }

    addCount(n: number) : number{
        this._count += n;
        return this._count;
    }

    useCount(n : number) : number{
        if (n > this._count) {
            throw new Error(`Use Count ${n} > Own Count ${this._count}, id: ${this._id}`);
        }
        this._count -= n;
        if (this._count == 0) {
            //移除
            GetBag(this.ItemType).Remove(this);
        }
        return this._count;
    }

    toString() : string{
        return `PropItem {id: ${this._id}, count: ${this._count}}`;
    }
}

