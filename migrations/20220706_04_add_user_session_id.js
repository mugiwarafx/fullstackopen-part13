const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'session_id', {
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'sessions', key: 'id' },
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'session_id')
  },
}
