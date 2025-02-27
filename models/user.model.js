import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";    

const User = sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    profilePic:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    level:{
        type: DataTypes.STRING,
        enum:["begineer","medium","advanced"],
        defaultValue:"beginner"
    },
    otp:{
        type: DataTypes.INTEGER
    }
});

sequelize.sync()
    .then(()=>{
        console.log("User model created.");
    }).catch(err=>{
        console.log("Something wrong..",err);
    })

export default User;
    