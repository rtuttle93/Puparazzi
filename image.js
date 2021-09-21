const { Model, DataTypes } = require('sequelize');


const sequelize = require('../config/connection.js');

class Image extends Model {}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    image_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'image'
    },
    image_content: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: { len: [1] },

    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dog_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Dog',
          key: 'id'
        }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    image_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'image',
          key: 'id'
      }
  }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Image',
  }
);

module.exports = Image;
