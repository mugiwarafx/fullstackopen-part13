const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1991,
        max: new Date().getFullYear(),
      },
    },
  },
  {
    sequelize,
    // We also defined underscored: true, which means that table names
    // are derived from model names as plural snake case versions.
    // Practically this means that, if the name of the model,
    // as in our case is "Blog", then the name of the corresponding
    // table is its plural version written with a lower case initial letter,
    // i.e. blogs. If, on the other hand, the name of the model
    // would be "two-part", e.g. StudyGroup, then the name of the table would be study_groups.
    // Sequelize automatically infers table names, but also allows explicitly defining them.
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
)

module.exports = Blog
