/**
 * manager for network messages
 */

import {BaseMsg, EMsgId} from "../Define/MsgDefine";
import {SendToServer} from "./MockNetwork";
import {Info} from "../Common/Log";

/**
 *  signature for all registered message handle functions
 */
type MsgHandler = (msgId: EMsgId, serverData: any, sendData?: any) => boolean;

/**
 * signature for all registered message send data formatter
 */
type MsgSendDataFormatter = (sendData: any, msgData: any) => void;

/**
 * all registered message handlers
 */
let _MsgReceiveHandlers: Map<EMsgId, MsgHandler>

/**
 * all registered message send data formatter
 */
let _MsgSendDataFormatter: Map<EMsgId, MsgSendDataFormatter>

/**
 * keep the data of sent message, which will be processed with the reply
 *
 * In light-server-mode. server just reply ok, client should do the simulation by self
 */
let _MsgWait: Map<EMsgId, any>

export function Init() {
    _MsgReceiveHandlers = new Map<EMsgId, MsgHandler>()
    _MsgSendDataFormatter = new Map<EMsgId, MsgSendDataFormatter>()
    _MsgWait = new Map<EMsgId, any>()
}

function InnerSendMsg(strMsg: string) {
    SendToServer(strMsg)
    Info(`Send Msg: ${strMsg} `)
}

/**
 * Send message to server
 * @param msgId message unique id
 * @param sendData message content
 */
export function SendMsg(msgId: EMsgId, sendData?: any) {
    let formatter = _MsgSendDataFormatter.get(msgId);
    let msgData = sendData;
    if (formatter) {
        msgData = {}
        formatter(sendData, msgData)
    }
    let msg: BaseMsg = {
        id: msgId,
        data: msgData,
    };
    let strMsg = JSON.stringify(msg)
    _MsgWait.set(msgId, sendData)
    InnerSendMsg(strMsg)
}

/**
 * process incoming network message
 *
 * DO NOT CALL!!!
 * @param strMsg serialized data
 */
export function _OnReceiveMsg(strMsg: string): void {
    Info(`Receive Msg: ${strMsg}`)

    let msg: BaseMsg = JSON.parse(strMsg);
    if (!msg || !msg.id) {
        throw new Error(`Msg parse failed: ${strMsg}`);
    }
    let handler = _MsgReceiveHandlers.get(msg.id);
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
 * @param receiveHandler handle function
 */
export function RegMsgHandler(msgId: number, receiveHandler: MsgHandler, sendDataFormatter?: MsgSendDataFormatter) {
    _MsgReceiveHandlers.set(msgId, receiveHandler);
    if (sendDataFormatter) {
        _MsgSendDataFormatter.set(msgId, sendDataFormatter);
    }
}

