module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      mobileNo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "mobileNo"
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password"
      }
    },
    {
      timestamps: false
    }
  );
};
