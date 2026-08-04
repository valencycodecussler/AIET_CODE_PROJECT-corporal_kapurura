const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Invoice = sequelize.define('Invoice', {

        id: {

            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },

        invoiceNumber: {

            type: DataTypes.STRING,
            allowNull: false,
            unique: true

        },

        orderId: {

            type: DataTypes.INTEGER,
            allowNull: false

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

        },

        status: {

            type: DataTypes.ENUM(
                'Paid',
                'Pending',
                'Cancelled'
            ),

            defaultValue: 'Pending'

        }

    }, {

        tableName: 'invoices',
        timestamps: false

    });

    return Invoice;

}