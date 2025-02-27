import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";


const MeditationSession = sequelize.define("meditationSession", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,  
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM("video", "audio"),  
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,  
        allowNull: true
    }
}, {
    timestamps: true,
});

sequelize.sync()
.then(()=>{
    console.log("Meditation model created");
}).catch(err=>{
    console.log("Error in Meditation model:",err);    
})

export default MeditationSession;


// import mongoose from "mongoose";

// const MeditationSessionSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     duration: Number,
//     date: Date,
//     notes: String
// }, { timestamps: true });

// export default mongoose.model("MeditationSession", MeditationSessionSchema);
