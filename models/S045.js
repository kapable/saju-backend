const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class S045 extends Model {
    static init(sequelize) {
        return super.init({ 
            DB_check: {
                type: DataTypes.CHAR(2),
                allowNull: true,
            },
            DB_data: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            DB_express: {
                type: DataTypes.CHAR(10),
                allowNull: true,
            },
            DB_num: {
                type: DataTypes.CHAR(2),
                allowNull: true,
            },
            DB_numerical: {
                type: DataTypes.CHAR(2),
                allowNull: true,
            },
            DB_title: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            createdAt: {
                allowNull: true,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        }, {
            modelName: 'S045',
            tableName: 'S045',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            sequelize
        });
    };
    static associate(db) {
    };
};
