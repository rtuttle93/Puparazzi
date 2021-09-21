// const { Model, DataTypes } = require('sequelize');

// const sequelize = require('../config/connection.js');

// class dogApi extends Model {}

// dogApi.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     data: {
//         type: DataTypes.BLOB,
//     },
//     breed_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: false,
//     },
//     img_id: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     // user_id: {
//     //     type: DataTypes.INTEGER,
//     //     references: {
//     //       model: 'User',
//     //       key: 'id'
//     //     }
//     //   }
//     // define columns
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'dog',
//   }
// );

// module.exports = Dog;
