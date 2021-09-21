const { Model, DataTypes } = require('sequelize');
//require bcrypt for the encryption step
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');



class User extends Model {
  //logic to compare the password against its encrypted version for validation
   checkPassword(userLoginPassword) {
    return bcrypt.compareSync(userLoginPassword, this.password);
}
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      //adding this to make sure we don't have people register with duplicate usernames
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
        },
        // set up beforeUpdate "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
  }
  },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User',
  }
);

module.exports = User;
