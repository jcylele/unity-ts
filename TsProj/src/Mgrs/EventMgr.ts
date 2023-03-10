//manager of all game events

import {EEventID} from "../Define/EventDefine";
import {NextId} from "./IdMgr";
import {WaitContainer} from "./WaitContainer";

/**
 * event callback function delegate(type define)
 */
type EventHandler = (eventData: any, eventId: EEventID) => void

/**
 * <EEventID, <unique handler id, handle function>>
 */
const _EventHandlers = new Map<EEventID, Map<number, EventHandler>>()

/**
 * maps handler id to EEventID
 */
const _EventIdReverse = new Map<number, EEventID>()

/**
 * is now dispatching? during this add and remove should be suspended,
 * to avoid bugs like adding/removing handlers in handler functions
 */
let _isPatching = false;

type WaitHandler = [EEventID, EventHandler]

/**
 * event callbacks waiting for add or removal
 */
let _Wait: WaitContainer<number, WaitHandler>

export function Init() {
    _EventHandlers.clear()
    _EventIdReverse.clear()
    _Wait = new WaitContainer()
}

/**
 * dispatch event, invoke all the handlers(order is not guaranteed)
 * @param eventId event id
 * @param eventData any data passes to handlers
 * @returns
 */
export function DispatchEvent(eventId: EEventID, eventData: any): void {
    //set flag, _EventHandlers should not be changed during dispatching
    _isPatching = true;
    let map = _EventHandlers.get(eventId);
    if (map) {
        map.forEach(handler => {
            handler(eventData, eventId);
        })
    }
    _isPatching = false;

    //waiting remove
    _Wait.ProcessRemove(InnerRemoveHandler);
    //waiting add
    _Wait.ProcessAdd((k, v) => InnerAddHandler(k, ...v))
}

/**
 * actual handler addition
 * @constructor
 */
function InnerAddHandler(handlerId: number, eventId: EEventID, handleFunc: EventHandler) {
    let map = _EventHandlers.get(eventId);
    if (!map) {
        map = new Map<number, EventHandler>();
        _EventHandlers.set(eventId, map);
    }

    map.set(handlerId, handleFunc);
    _EventIdReverse.set(handlerId, eventId);
}

/**
 * add an event callback
 * @param eventId event id
 * @param handleFunc event callback, remember to call bind(this) if this is needed
 * @returns unique handle id, can be used to unregister
 */
export function RegEventHandler(eventId: EEventID, handleFunc: EventHandler): number {
    let handlerId = NextId();
    if (!_isPatching) {
        InnerAddHandler(handlerId, eventId, handleFunc);
    } else {
        _Wait.Add(handlerId, [eventId, handleFunc]);
    }
    return handlerId;
}

/**
 * actual handler removal
 * @param handlerId unique handler id
 * @constructor
 */
function InnerRemoveHandler(handlerId: number) {
    let eventId = _EventIdReverse.get(handlerId);
    if (!eventId) {
        throw new Error("handler not exist");
    }
    let map = _EventHandlers.get(eventId);
    if (!map) {
        return;
    }
    map.delete(handlerId);
    _EventIdReverse.delete(handlerId);
}

/**
 * remove handler by id
 * @param handlerId unique handler id
 * @returns 0 so it can be called like this._handlerId = UnregEventHandler(this._handlerId)
 */
export function UnregEventHandler(handlerId: number): number {
    //relieve caller from checking for handlerId
    if (handlerId == 0) {
        return 0;
    }
    if (!_isPatching) {
        InnerRemoveHandler(handlerId);
    } else {
        _Wait.Remove(handlerId)
    }

    return 0;
}


