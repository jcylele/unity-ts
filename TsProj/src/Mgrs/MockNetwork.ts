/**
 * Temporary File, just for test
 */

import {AllItemsMsg, BaseMsg, EMsgId, PropItemMsg} from "../Define/MsgDefine";
import {_OnReceiveMsg} from "./MsgMgr";

let waiting_msg: BaseMsg[]

let all_items: AllItemsMsg = {
    hero: [
        {uid: 1, id: 2, level: 1},
    ],
    prop: [
        {id: 100, count: 100}
    ]
}

let new_prop_item: PropItemMsg = {
    id: 200,
    count: 10
}

export function SendToServer(content: string) {
    const msg = JSON.parse(content)
    waiting_msg.push(msg)
}

function ProcessMsg(msg: BaseMsg): BaseMsg {
    const response: BaseMsg = {id: msg.id}
    switch (msg.id) {
        case EMsgId.AllItem:
            response.data = all_items
            break
    }
    return response
}

function NewMsg(id: EMsgId): BaseMsg {
    const response: BaseMsg = {id: id}
    switch (id) {
        case EMsgId.NewPropItem:
            response.data = new_prop_item
            break
    }
    return response
}

function ReceiveFromServer(msg: BaseMsg) {
    _OnReceiveMsg(JSON.stringify(msg))
}

export function Init() {
    waiting_msg = []
}

export function Update(deltaTime: number) {
    const msg = waiting_msg.shift()
    if (msg) {
        ReceiveFromServer(ProcessMsg(msg))
    }
    if (Math.random() < deltaTime / 5000) {
        ReceiveFromServer(NewMsg(EMsgId.NewPropItem))
    }
}