export default (sequelize, DataTypes) => {
  const Dashboard = sequelize.define('Dashboard', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    icon: {
      allowNull: true,
      type: DataTypes.STRING,
      // defaultValue: '...'
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

  Dashboard.associate = (models) => {
    Dashboard.hasMany(models.Graph, {
      as: 'graphs',
      foreignKey: 'dashboardId',
    });
  };

  return Dashboard;
};
