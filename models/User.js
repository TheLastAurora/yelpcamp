const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            birth_date: DataTypes.DATEONLY,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
        }, { sequelize: connection, freezeTableName: true, tableName: 'user' })
    }
};

module.exports = User;