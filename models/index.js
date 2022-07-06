const Blog = require('./blog')
const User = require('./user')
const Session = require('./session')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Session)
Session.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist })

// User hasMany readinglist as readings
User.hasMany(Readinglist)
Readinglist.belongsTo(User)

// Blog hasMany readinglist as readinglists
Blog.hasMany(Readinglist, { as: 'readinglists' })
Readinglist.belongsTo(Blog)

module.exports = {
  Blog,
  User,
  Readinglist,
  Session,
}
