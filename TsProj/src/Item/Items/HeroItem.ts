/**
 * represents a hero
 */

import {HeroItemMsg} from "../../Define/MsgDefine";
import {BaseAttr, BaseItem} from "../Base/BaseItem";
import {CachedValue} from "../Base/AttrCache";
import {EItemType} from "../../Define/ItemDefine";
import {AttrSetter} from "../Base/ItemDecorator";
import {GetHeroConfig, HeroConfig} from "../Configs/HeroConfig";

class HeroBaseAttr extends BaseAttr {
    private readonly _uid: number
    public get uid(): number {
        return this._uid
    }

    private readonly _id: number
    public get id(): number {
        return this._id
    }

    private _level: number
    public get level(): number {
        return this._level
    }

    @AttrSetter
    public set level(val: number) {
        this._level = val
    }

    constructor(sData: HeroItemMsg, owner: HeroItem) {
        super(owner)
        this._uid = sData.uid;
        this._id = sData.id;
        this._level = sData.level;
    }
}

/**
 * type alias, [0]attr id [1] attr value
 */
export type AttrPair = [number, number]

export class HeroItem extends BaseItem {
    declare readonly base: HeroBaseAttr;
    declare readonly config?: HeroConfig;

    public get ItemType(): EItemType {
        return EItemType.Hero
    }

    get Key(): number {
        return this.base.uid;
    }

    readonly attr_list: CachedValue<AttrPair[]>

    constructor(sData: HeroItemMsg) {
        super();
        this.base = new HeroBaseAttr(sData, this)
        this.config = GetHeroConfig(this.base.id)
        this.attr_list = new CachedValue(this, this.CalcAttr);
    }

    CalcAttr(): AttrPair[] {
        if (!this.config) {
            return [];
        }
        let attrs = this.config.attrs;
        let attrList = new Array<AttrPair>(attrs.length);
        attrs.forEach((value, index) => {
            attrList[index] = [index, value * this.base.level];
        });
        return attrList;
    }

    AddLevel(lv: number) {
        this.base.level += lv;
    }
}

