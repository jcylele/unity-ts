import {EItemType} from "../../Define/ItemDefine";
import {BaseConfig} from "./BaseConfig";

export default abstract class BaseItem {
    /**
     * 配置
     */
    readonly config?: BaseConfig;

    /**
     * 物品类型
     */
    public get ItemType(): EItemType {
        return EItemType.None
    }

    /**
     * 物品索引属性值
     */
    abstract get Key(): number

    /**TODO
     * 恶心，真的恶心
     * 为了使用泛型背包，同时进行统一背包管理
     * 又为了装饰器机制实现物品变动通知
     * itemType属性对象要类也要，还没法一起定义
     */

}

