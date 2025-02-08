import User from './user'
import Membership from './membership';


// 关联关系：一个用户有一个会员信息
User.hasOne(Membership, { foreignKey: 'userId' });
Membership.belongsTo(User, { foreignKey: 'userId' });

export { User,Membership }
