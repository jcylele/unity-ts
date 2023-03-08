/**
 * manager for network messages
 */

import {BaseMsg, EMsgId} from "../Define/MsgDefine";
import {SendToServer} from "./MockNetwork";

/**
 *  signature for all registered message handle functions
 */
type MsgHandler = (msgId: EMsgId, serverData: any, sendData?: any) => boolean;

/**
 * all registered message handlers
 */
let _MsgHandlers : Map<EMsgId, MsgHandler>

/**
 * keep the data of sent message, which will be processed with the reply
 *
 * In light-server-mode. server just reply ok, client should do the simulation by self
 */
let _MsgWait : Map<EMsgId, any>

export function Init() {
    _MsgHandlers = new Map<EMsgId, MsgHandler>()
    _MsgWait = new Map<EMsgId, any>()
}

function InnerSendMsg(strMsg: string) {
    SendToServer(strMsg)
    console.log(`Send Msg: ${strMsg} `)
}

/**
 * Send message to server
 * @param msgId message unique id
 * @param msgData message content
 */
export function SendMsg(msgId: EMsgId, msgData?: any) {
    let msg: BaseMsg = {
        id: msgId,
        data: msgData,
    };
    let strMsg = JSON.stringify(msg)
    _MsgWait.set(msgId, msgData)
    InnerSendMsg(strMsg)
}

/**
 * process incoming network message
 *
 * DO NOT CALL!!!
 * @param strMsg serialized data
 */
export function _OnReceiveMsg(strMsg: string): void {
    console.log(`Receive Msg: ${strMsg}`)

    let msg: BaseMsg = JSON.parse(strMsg);
    if (!msg || !msg.id) {
        throw new Error(`Msg parse failed: ${strMsg}`);
    }
    let handler = _MsgHandlers.get(msg.id);
    if (!handler) {
        throw new Error(`No Msg Handler For Msg Id : ${msg.id}`);
    }
    let sendData = _MsgWait.get(msg.id);
    _MsgWait.delete(msg.id);
    if (!handler(msg.id, msg.data, sendData)) {
        throw new Error(`Error in Handle Msg: ${strMsg}`);
    }
}

/**
 * register handle function for network messages
 *
 * register new handler will override the old one, unregister is unnecessary
 * @param msgId message id
 * @param handler handle function
 */
export function RegMsgHandler(msgId: number, handler: MsgHandler) {
    _MsgHandlers.set(msgId, handler);
}

