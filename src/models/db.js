const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,          
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);


const User = require('./users')(sequelize);
const Product = require('./product')(sequelize);
const Order = require('./order')(sequelize);
const Invoice = require('./invoice')(sequelize);

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });
User.hasMany(Order, { foreignKey: 'userId' });
Product.hasMany(Order, { foreignKey: 'productId' });

Invoice.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasOne(Invoice, { foreignKey: 'orderId' });

Invoice.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Invoice, { foreignKey: 'userId' });

Invoice.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Invoice, { foreignKey: 'productId' });

module.exports = {
    sequelize,
    User,
    Product,
    Order,
    Invoice
};