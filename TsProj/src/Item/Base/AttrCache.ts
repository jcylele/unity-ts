/**
 * class who uses an AttrCache should implement this interface
 */
export interface IAttrProvider {
    /**
     * field contains attributes
     */
    readonly attr: AttrCache

    /**
     * calculate attributes, only called when necessary
     */
    CalcAttr(): AttrPair[]
}

/**
 * type alias, [0]attr id [1] attr value
 */
export type AttrPair = [number, number]

/**
 * cache of attributes
 */
export class AttrCache {
    /**
     * attributes list, will be undefined when invalidated, will calculate before used
     */
    private attrList: AttrPair[]

    constructor(private readonly attrProvider: IAttrProvider) {
    }

    Invalidate(): void {
        this.attrList = undefined
    }

    /**
     * list of attributes
     *
     * DO NOT CHANGE
     * @constructor
     */
    get AttrList(): AttrPair[] {
        if (this.attrList) {
            return this.attrList
        }
        this.attrList = this.attrProvider.CalcAttr()
        return this.attrList
    }

    GetAttr(attrId: number): number {
        for (const attrTuple of this.AttrList) {
            if (attrTuple[0] === attrId) {
                return attrTuple[1];
            }
        }
        return 0;
    }

    get Length(): number {
        return this.AttrList.length;
    }

    Get(index: number): AttrPair {
        return this.AttrList[index];
    }
}

