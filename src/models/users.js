const {DataTypes, Sequelize} =require('sequelize');

module.exports = (Sequelize)=>{
    const User = Sequelize.define('User',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        username:{
            type:DataTypes.STRING(50),
            allowNull:false,
            unique:true
        },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING(255),
            allowNull:false
        },
        regDate:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.NOW
        }
    },{
        timestamp:false,//we use regDate instead of CreatedAt
        tableName:'users'//match existing table name
    });
     
    return User;
};

