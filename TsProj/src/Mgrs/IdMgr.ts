// universal unique id generator

let _nextId = 0;

/**
 * get next unique handle id
 * @returns unique handle id
 */
export function NextId(): number {
    return ++_nextId;
}

export function Init() {
    _nextId = 0
}