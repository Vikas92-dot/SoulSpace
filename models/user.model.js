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
        enum:["beginner","intermediate","advanced"],
        defaultValue:"beginner"
    },
    otp:{
        type: DataTypes.STRING
    }
});

sequelize.sync()
    .then(()=>{
        console.log("User model created.");
    }).catch(err=>{
        console.log("Something wrong..User",err);
    })

export default User;
    