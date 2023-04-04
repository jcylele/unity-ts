/**
 * controller for all items in the game
 */
import {AllItemsMsg, EMsgId} from "../Define/MsgDefine";
import {RegMsgHandler, SendMsg} from "../Mgrs/MsgMgr";
import {GetBag} from "../Mgrs/ItemMgr";
import {EItemType} from "../Define/ItemDefine";
import {HeroItem} from "../Item/Items/HeroItem";
import {PropItem} from "../Item/Items/PropItem";

function OnAllItemMsg(msgId: number, msgData: AllItemsMsg): boolean {
    const heroBag = GetBag(EItemType.Hero)
    for (const hero of msgData.hero) {
        heroBag.Add(new HeroItem(hero))
    }
    const propBag = GetBag(EItemType.Prop)
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

function OnUsePropItemMsg(msgId: EMsgId) : boolean {
    return true;
}

export function UsePropItem(id: number, count: number) {
    SendMsg(EMsgId.UsePropItem, {id: id, count: count})
}

function FormatUsePropMsg(sendData: any, msgData: any) {
    msgData.id = sendData.id
    msgData.count = sendData.count
}

export function Init() {
    RegMsgHandler(EMsgId.AllItem, OnAllItemMsg);
    RegMsgHandler(EMsgId.NewPropItem, OnNewPropItemMsg);

    RegMsgHandler(EMsgId.UsePropItem, OnUsePropItemMsg, FormatUsePropMsg);
}