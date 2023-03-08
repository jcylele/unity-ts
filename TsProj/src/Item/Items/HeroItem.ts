/**
 * represents a hero
 */

import { HeroItemMsg } from "../../Define/MsgDefine";
import BaseItem from "../Base/BaseItem";
import {AttrCache, AttrPair, IAttrProvider} from "../Base/AttrCache";
import {EItemType} from "../../Define/ItemDefine";
import {attrInvalidated, itemChanged} from "../Base/ItemDecorator";
import {GetHeroConfig, HeroConfig} from "../Configs/HeroConfig";

export class HeroItem extends BaseItem implements IAttrProvider {

    declare readonly config?: HeroConfig;

    public get ItemType(): EItemType {
        return EItemType.Hero
    }

    get Key(): number {
        return this._uid;
    }

    private readonly _uid : number;
    public get uid() : number {
        return this._uid;
    }
    private readonly _id: number;
    public get id(): number {
        return this._id;
    }
    private _level: number;
    public get level(): number {
        return this._level;
    }

    readonly attr: AttrCache

    constructor(sData: HeroItemMsg) {
        super();
        this._uid = sData.uid;
        this._id = sData.id;
        this._level = sData.level;
        this.config = GetHeroConfig(this._id);
        this.attr = new AttrCache(this);
    }

    CalcAttr(): AttrPair[] {
        if (!this.config) {
            return [];
        }
        let attrs = this.config.attrs;
        let attrList = new Array<AttrPair>(attrs.length);
        attrs.forEach((value, index) => {
            attrList[index] = [index, value * this._level];
        });
        return attrList;
    }

    @attrInvalidated
    @itemChanged
    AddLevel(lv: number) {
        this._level += lv;
    }

    toString() : string{
        return `HeroItem {uid: ${this._uid}, id: ${this._id}, level: ${this._level}}`;
    }
}

