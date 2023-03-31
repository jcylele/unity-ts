import {BaseItem} from "./BaseItem";

export abstract class SingletonItem extends BaseItem {
    override get Key(): number {
        return 0;
    }
}