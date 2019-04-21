export default (sequelize, DataTypes) => {
  const Graph = sequelize.define('Graph', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    dashboardId: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Dashboards',
        key: 'id',
        as: 'dashboardId',
      },
    },
    icon: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    publicUrl: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    updateInterval: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: (15 * 60) // 15 minutes
    }
  });

  Graph.associate = (models) => {
    Graph.belongsTo(models.Dashboard, {
      as: 'dashboard',
      foreignKey: 'dashboardId',
      onDelete: 'CASCADE'
    });
  };

  return Graph;
};
