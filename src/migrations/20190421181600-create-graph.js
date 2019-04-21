module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Graphs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      dashboardId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Dashboards',
          key: 'id',
          as: 'dashboardId',
        },
      },
      icon: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      publicUrl: {
        allowNull: true,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      updateInterval: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: (15 * 60) // 15 minutes
      },
      // ---------------------
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Graphs')
};
