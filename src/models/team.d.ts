import {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;//表示可有可无
    maxNum: number;
    password?: string,
    // todo 定义枚举值类型，更规范
    status: number;
    //创建人用户id
    userId: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    // hasJoin?: boolean;
    hasJoinNum?: number;
}
