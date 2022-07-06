const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Readinglist extends Model {}

Readinglist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blog', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_lists',
    as: 'readings',
  }
)

module.exports = Readinglist
