const sequelize = require('./connection'); // Import kết nối MySQL
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const Account = sequelize.define('account', {
  AccountID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Username: {
    type: Sequelize.STRING(100),
    characterSet: 'utf8mb3',
    collate: 'utf8mb3_general_ci',
  },
  Password: {
    type: Sequelize.STRING(100),
    characterSet: 'utf8mb3',
    collate: 'utf8mb3_general_ci',
  },
  CodeID: {
    type: Sequelize.INTEGER,
  },
  RoleID: {
    type: Sequelize.INTEGER,
  },
  TotalMoney: {
    type: Sequelize.DOUBLE,
  },
}, {
  timestamps: false, // Nếu bạn không muốn sử dụng cột timestamps (createdAt và updatedAt)
  tableName: 'account', // Tên bảng trong cơ sở dữ liệu
  hooks: {
    beforeCreate: async (account) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(account.Password, salt);
      account.Password = hashedPassword;
    },
  },
});

module.exports = Account;
