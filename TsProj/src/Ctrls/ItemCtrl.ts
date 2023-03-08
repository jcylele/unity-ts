/**
 * controller for all items in the game
 */
import {AllItemsMsg, EMsgId} from "../Define/MsgDefine";
import {RegMsgHandler, SendMsg} from "../Mgrs/MsgMgr";
import {NewBag} from "../Mgrs/ItemMgr";
import {EItemType} from "../Define/ItemDefine";
import {HeroItem} from "../Item/Items/HeroItem";
import {PropItem} from "../Item/Items/PropItem";

function OnAllItemMsg(msgId: number, msgData: AllItemsMsg): boolean {
    const heroBag = NewBag(EItemType.Hero)
    for (const hero of msgData.hero) {
        heroBag.Add(new HeroItem(hero))
    }
    const propBag = NewBag(EItemType.Prop)
    for (const prop of msgData.prop) {
        propBag.Add(new PropItem(prop))
    }

    return true;
}

function OnNewPropItemMsg(msgId: number, msgData: AllItemsMsg): boolean {
    return true;
}

export function SendAllItemsMsg() {
    SendMsg(EMsgId.AllItem)
}

export function Init() {
    RegMsgHandler(EMsgId.AllItem, OnAllItemMsg);
    RegMsgHandler(EMsgId.NewPropItem, OnNewPropItemMsg);
}

