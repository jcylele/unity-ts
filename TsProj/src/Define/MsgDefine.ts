/**
 * Define Network Message Ids and Data Structures
 */

/**
 * network message id
 */
export enum EMsgId {
    None = 0,
    AllItem = 1001,
    UseItem = 1002,
    NewPropItem = 1003,
}

/**
 * most basic structure, data structure depends on id
 */
export type BaseMsg = {
    id : EMsgId;
    data? : any;
}

/**
 * one hero
 */
export type HeroItemMsg = {
    uid : number;
    id: number;
    level: number;
}

/**
 * one prop item
 */
export type PropItemMsg = {
    id: number;
    count: number;
}

/**
 * all items in the bag
 */
export type AllItemsMsg = {
    hero : HeroItemMsg[];
    prop : PropItemMsg[];
}

