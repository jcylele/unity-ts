/**
 * Temporary File, just for test
 */

import {BaseMsg, EMsgId} from "../Define/MsgDefine";
import {_OnReceiveMsg} from "./MsgMgr";

let waiting_msg: BaseMsg[]

export function SendToServer(content: string) {
    const msg = JSON.parse(content)
    waiting_msg.push(msg)
}

function ProcessMsg(msg: BaseMsg): BaseMsg {
    const response: BaseMsg = {id: msg.id}
    if (msg.id == EMsgId.AllItem) {
        response.data = {
            hero: [{uid: 1, id: 2, level: 1}],
            prop: [{id: 100, count: 100}]
        }
    }
    return response
}

function ReceiveFromServer(msg: BaseMsg) {
    _OnReceiveMsg(JSON.stringify(msg))
}

export  function Init() {
    waiting_msg = []
}

export function Update(deltaTime: number) {
    for (const msg of waiting_msg) {
        ReceiveFromServer(ProcessMsg(msg))
    }
    waiting_msg = []
}