import {BaseMsg, EMsgId} from "../Define/MsgDefine";
import {SendToServer} from "./MockNetwork";
import {Info} from "../Common/Log";

let _MsgResponse: Map<EMsgId, any> = new Map<EMsgId, any>()


export function _OnReceiveMsg(strMsg: string): void {
    Info(`Receive Msg: ${strMsg}`)

    let msg: BaseMsg = JSON.parse(strMsg);
    if (!msg || !msg.id) {
        throw new Error(`Msg parse failed: ${strMsg}`);
    }

    if (!_MsgResponse.has(msg.id)) {
        throw new Error(`Unexpected Msg Id : ${msg.id}`);
    }

    _MsgResponse.set(msg.id, msg.data)
}

async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function RPC(msgId: EMsgId, sendData?: any): Promise<any> {
    // let formatter = _MsgSendDataFormatter.get(msgId);
    // let msgData = sendData;
    // if (formatter) {
    //     msgData = {}
    //     formatter(sendData, msgData)
    // }

    if (_MsgResponse.has(msgId)) {
        throw new Error(`MsgId: ${msgId} is already in use`)
    }

    let msg: BaseMsg = {
        id: msgId,
        data: sendData,
    };
    let strMsg = JSON.stringify(msg)

    SendToServer(strMsg)
    Info(`Send Msg: ${strMsg} `)

    _MsgResponse.set(msgId, null)

    let response = null
    while (response === null) {
        await delay(100)
        response = _MsgResponse.get(msgId)
    }

    _MsgResponse.delete(msgId)
    return response
}