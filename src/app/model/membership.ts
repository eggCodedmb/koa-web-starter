import { DataTypes, NOW } from 'sequelize'
import type { IBaseModel } from './base'
import { BaseModel, baseFields, baseOptions } from './base'
import User from './user'

export interface IMembership extends IBaseModel {
    userId: string,
    level?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum',
    startDate?: Date,
    endDate: Date,
    points: number
}

export default class Membership extends BaseModel<IMembership, IMembership> { }

Membership.init(
    {
        ...baseFields,
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
            onDelete: 'CASCADE',
            comment: '用户id'
        },
        level: {
            type: DataTypes.ENUM('Bronze', 'Silver', 'Gold', 'Platinum'),
            allowNull: true,
            defaultValue: 'Bronze',
            comment: '会员等级 Bronze: 青铜, Silver: 白银, Gold: 黄金, Platinum: 白金'
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: NOW,
            comment: '开始日期'
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '结束日期',
            defaultValue: '9999-12-31 23:59:59'
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            comment: '积分'
        }
    },
    {
        tableName: 'membership',
        ...baseOptions,
    },
)
