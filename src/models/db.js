const{Sequelize,} =require('sequelize');
require('dotenv').config();

//sequelize instance creation
const sequelize= new Sequelize(
    process.env.DB_NAME,
    process.env.BD_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:'mysql',
        logging:false,
        pool:{
            max:10,
            min:0,
            acquire:30000,
            idle:10000
        }
    }
);

//import models
const User = require('./users.model')(sequelize);
 const Product = require('./product.model')(sequelize);
 const Order = require('./order.model')(sequelize);
 const Invoice = require('./invoice.model')(sequelize);

 //define associations
 //Order-->User(many-to-one)
 Order.belongsTo(User,{foreignKey:'userId'});
 Product.hasMany(Order,{foreignKey:'productId'});

 //Invoice-->Order
 Invoice.belongsTo(Order,{foreignKey:'orderId'});
 Order.hasOne(Invoice,{foreignKey:'orderId'});
 
 //Invoice-->User(optional, but useful for direct reference)
 Invoice.belongsTo(User,{foreignKey:'userId'});
 User.hasMany(Invoice,{foreignKey:'userId'});

 //Invoice-->Product
 Invoice.belongsTo(Product,{foreignkey:'productId'});
 Product.hasMany(Invoice,{foreignKey:'productId'});

 module.exports = {
    sequelize,
    User,
    Product,
    Order,
    Invoice
 };
