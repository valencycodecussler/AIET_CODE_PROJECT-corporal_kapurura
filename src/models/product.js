const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Product = sequelize.define('Product', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {

        tableName: 'products',
        timestamps: false

    });

    return Product;
}
