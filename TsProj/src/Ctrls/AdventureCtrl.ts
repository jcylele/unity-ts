import {GetBag, GetItem} from "../Mgrs/ItemMgr";
import {AdventureItem} from "../Item/Items/AdventureItem";
import {EItemType} from "../Define/ItemDefine";
import {ETaskState} from "../Define/TaskDefine";
import {GetText} from "../Common/Text";
import {RegMsgHandler, SendMsg} from "../Mgrs/MsgMgr";
import {AdventureMsg, EMsgId} from "../Define/MsgDefine";
import {RPC} from "../Mgrs/NewMsgMgr";

export function GetCurrentTaskCount(): number {
    const adventureItem = GetItem<AdventureItem>(EItemType.Adventure)
    if (adventureItem != undefined) {
        return adventureItem.config.task_ids.length
    }
    return 0
}

export function FormatTaskState(state: ETaskState): string {
    return GetText(`Task_State_${state}`)
}

export function RequestAdventure() {
    SendMsg(EMsgId.GetAdventure)
}

export async function GetAdventureInfo() {
    const msgData = await RPC(EMsgId.GetAdventure)
    OnGetAdventure(EMsgId.GetAdventure, msgData)
    return msgData
}

function OnGetAdventure(msgId: number, msgData: AdventureMsg): boolean {
    const adventureBag = GetBag(EItemType.Adventure)
    let adventureItem = GetItem<AdventureItem>(EItemType.Adventure)
    if (adventureItem == undefined) {
        adventureItem = new AdventureItem(msgData)
        adventureBag.Add(adventureItem)
    }else {
        adventureItem.base.ToNextStage(msgData)
    }

    return true
}

export function Init() {
    RegMsgHandler(EMsgId.GetAdventure, OnGetAdventure)
}

