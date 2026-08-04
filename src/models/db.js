const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

//  the models 
const User = require('./users')(sequelize);
const Product = require('./product')(sequelize);
const Order = require('./order')(sequelize);
const Invoice = require('./invoice')(sequelize);

//  define associations
User.hasMany(Order, {
    foreignKey: 'userId'
});

Order.belongsTo(User, {
    foreignKey: 'userId'
});

// ...other associations...

module.exports = {
    sequelize,
    User,
    Product,
    Order,
    Invoice
};