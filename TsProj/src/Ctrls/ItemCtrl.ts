/**
 * controller for all items in the game
 */
import {AllItemsMsg, EMsgId} from "../Define/MsgDefine";
import {RegMsgHandler, SendMsg} from "../Mgrs/MsgMgr";

function OnAllItemMsg(msgId: number, msgData: AllItemsMsg): boolean {
    console.log(msgData.hero)
    console.log(msgData.prop)
    return true;
}

function OnNewPropItemMsg(msgId: number, msgData: AllItemsMsg): boolean {
    console.log(msgData)
    return true;
}

export function SendAllItemsMsg() {
    SendMsg(EMsgId.AllItem)
}

export function Init() {
    RegMsgHandler(EMsgId.AllItem, OnAllItemMsg);
    RegMsgHandler(EMsgId.NewPropItem, OnNewPropItemMsg);
}

