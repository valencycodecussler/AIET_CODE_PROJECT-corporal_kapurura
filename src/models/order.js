const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Order = sequelize.define('Order', {

        id: {

            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },

        userId: {

            type: DataTypes.INTEGER,
            allowNull: false

        },

        productId: {

            type: DataTypes.INTEGER,
            allowNull: false

        },

        quantity: {

            type: DataTypes.INTEGER,
            allowNull: false

        },

        totalPrice: {

            type: DataTypes.DECIMAL(10,2),
            allowNull: false

        }

    }, {

        tableName: 'orders',
        timestamps: false

    });

    return Order;

}