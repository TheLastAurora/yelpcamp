const { Model, DataTypes } = require('sequelize');

const Campground = require('./Campground');

class Content extends Model {
    static init(connection) {
        super.init({
            link: DataTypes.STRING,
            campground_fk: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'campground',
                    key: 'id',
                },
            },
        }, { sequelize: connection, freezeTableName: true, tableName: 'content' });
    };

    static associate(models) {
        this.belongsTo(models.Campground, { foreignKey: 'campground_fk' });
    }
}

module.exports = Content;