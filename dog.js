const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Dog extends Model {}

Dog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dog_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dog_breed: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //   model: 'dogApi',
        //   key: 'breed_id'
        // }
      },
    // breed_content: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   references: {
    //     model: 'dogApi',
    //     key: 'breed_id'
    //   }
    // },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dog',
  }
);

module.exports = Dog;
