import {BaseTickGroup} from "./BaseTickGroup";

export class DefaultTickGroup extends BaseTickGroup {
    constructor(readonly index: number) {
        super(index);
    }

    Update(deltaTime: number): void {
        this.UpdateTickers(deltaTime)
    }

    /**
     * always 0, always tick
     */
    get interval(): number {
        return 0;
    }

    /**
     * always 0, always tick
     */
    get leftTime(): number {
        return 0;
    }
}