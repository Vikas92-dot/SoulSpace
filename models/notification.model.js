import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import User from "./user.model.js";

const Notification = sequelize.define("notification", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING, //Meditation
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN, 
        defaultValue: true,  //by default notification Enable hoga
    }
}, {
    timestamps: true,
});

sequelize.sync()
.then(()=>{
    console.log("notification model created");
}).catch(err=>{
    console.log("Error in notification model:",err);    
})

export default Notification;



















// import mongoose from "mongoose";

// const NotificationSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     type: String,
//     time: String
// }, { timestamps: true });

// export default mongoose.model("Notification", NotificationSchema);
