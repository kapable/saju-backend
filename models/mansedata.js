const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Mansedata extends Model {
    static init(sequelize) {
        return super.init({ 
            day_e: {
                type: DataTypes.CHAR(2),
                allowNull: true,
            },
            day_h: {
                type: DataTypes.CHAR(1),
                allowNull: true,
            },
            jeol: {
                type: DataTypes.CHAR(10),
                allowNull: true,
            },
            jeolip: {
                type: DataTypes.CHAR(10),
                allowNull: true,
            },
            month_e: {
                type: DataTypes.CHAR(2),
                allowNull: true,
            },
            month_h: {
                type: DataTypes.CHAR(1),
                allowNull: true,
            },
            no: {
                type: DataTypes.CHAR(8),
                allowNull: false,
                primaryKey: 'no',
            },
            umdate: {
                type: DataTypes.CHAR(8),
                allowNull: true,
            },
            umyear_e: {
                type: DataTypes.CHAR(2),
                allowNull: true,
            },
            umyear_h: {
                type: DataTypes.CHAR(2),
                allowNull: true,
            },
            week: {
                type: DataTypes.CHAR(2),
                allowNull: true,
            },
            woljang: {
                type: DataTypes.CHAR(2),
                allowNull: true,
            },
            year_e: {
                type: DataTypes.CHAR(2),
                allowNull: true,
            },
            year_h: {
                type: DataTypes.CHAR(1),
                allowNull: true,
            },
            youn: {
                type: DataTypes.CHAR(1),
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
            modelName: 'Mansedata',
            tableName: 'mansedatas',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            sequelize
        });
    };
    static associate(db) {
    };
};
