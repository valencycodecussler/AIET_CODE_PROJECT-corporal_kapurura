const {DataTypes, Sequelize, INTEGER} = require('sequelize');
const { Invoice } = require('./db');

module.exports = (Sequelize)=>{
    const User = Sequelize.define('User',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        invoiceNumber:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{min:1}
        },
        totalPrice:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
            validate:{min:0}
        },
        status:{
            type:DataTypes.ENUM('Paid','Pending','Cancelled'),
            defaultValue:'Paid'
        },
        createdAt:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.NOW
        }
    },{
        timestamps:true,
        tableName:'invoices'
    })
    return Invoice;
};