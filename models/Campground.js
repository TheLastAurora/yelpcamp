const { Model, DataTypes } = require('sequelize');

const User = require('./User');
const Location = require('./Location');

class Campground extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            location_fk: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'location',
                    key: 'id',
                },
            },
            user_fk: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            rating: DataTypes.DECIMAL,
            capacity: DataTypes.INTEGER,
            price: DataTypes.DOUBLE,
            rules: DataTypes.STRING,
            description: DataTypes.STRING
        }, { sequelize: connection, freezeTableName: true, tableName: 'campground' })
    };

    static associate(models) {
        this.belongsTo(models.Location, { foreignKey: 'location_fk' });
        this.belongsTo(models.User, { foreignKey: 'user_fk' });
    }
};

module.exports = Campground;