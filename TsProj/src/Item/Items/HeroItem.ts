/**
 * represents a hero
 */

import {HeroItemMsg} from "../../Define/MsgDefine";
import {BaseAttr, BaseItem} from "../Base/BaseItem";
import {AttrCache, AttrPair, IAttrProvider} from "../Base/AttrCache";
import {EItemType} from "../../Define/ItemDefine";
import {attrInvalidated, itemChanged} from "../Base/ItemDecorator";
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

    public set level(val: number) {
        this._level = val
    }

    constructor(sData: HeroItemMsg) {
        super()
        this._uid = sData.uid;
        this._id = sData.id;
        this._level = sData.level;
    }
}

export class HeroItem extends BaseItem implements IAttrProvider {
    declare readonly base: HeroBaseAttr;
    declare readonly config?: HeroConfig;

    public get ItemType(): EItemType {
        return EItemType.Hero
    }

    get Key(): number {
        return this.base.uid;
    }

    readonly attr: AttrCache

    constructor(sData: HeroItemMsg) {
        super();
        this.base = new HeroBaseAttr(sData)
        this.config = GetHeroConfig(this.base.id)
        this.attr = new AttrCache(this);
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

    @attrInvalidated
    @itemChanged
    AddLevel(lv: number) {
        this.base.level += lv;
    }
}

