import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const ContactUs = sequelize.define("contactus",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{ 
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    subject:{
        type: DataTypes.STRING,
        allowNull:false
    },
    message:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync()
.then(()=>{
    console.log("Contact model created successfully.");
})
.catch(err=>{
    console.log("Error in contact model:",err);
})

export default ContactUs;