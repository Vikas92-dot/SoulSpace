import { DataTypes } from "sequelize";

import sequelize from "../config/dbConfig.js";

const Admin = sequelize.define("admin",{
   id:{
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
   }, 
   email:{
    type: DataTypes.STRING,
    allowNull: false
   },
   password:{
    type: DataTypes.STRING,
    allowNull: false
   }
});
sequelize.sync()
.then(()=>{
    console.log("Admin model created...");
}).catch(err=>{
    console.log("Something wrong...");
    console.log(err);
});

export default Admin;


// import mongoose from 'mongoose';

// const AdminSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// },{ timestamps: true });

// const Admin = mongoose.model('Admin', AdminSchema);
// export default Admin;
