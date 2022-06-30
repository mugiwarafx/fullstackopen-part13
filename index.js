require('dotenv').config()

const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize')
const express = require('express')

const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query('SELECT * FROM blogs', {
      type: QueryTypes.SELECT,
    })
    console.log(blogs)
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()

/*

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
    date: {
      type: DataTypes.DATE,
      defaultValue: 0,
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

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

*/
