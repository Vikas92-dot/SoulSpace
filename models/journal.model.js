import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Journal = sequelize.define("journal", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
});

sequelize.sync()
.then(()=>{
    console.log("Journal model created");
}).catch(err=>{
    console.log("Error in journal model:",err);    
})

export default Journal;






// import mongoose from "mongoose";

// const JournalSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     title: String,
//     content: String,
//     date: Date
// }, { timestamps: true });

// export default mongoose.model("Journal", JournalSchema);
