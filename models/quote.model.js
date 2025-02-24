import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";


const Quote = sequelize.define("quote", {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true
  },
  text: {
      type: DataTypes.STRING,
      allowNull: false
  },
  author: {
      type: DataTypes.STRING,
      defaultValue: "Unknown"
  }
}, {
  timestamps: true,
});

sequelize.sync().then(()=>{
  console.log("Quote model created.");
}).catch(err=>{
  console.log("Error in Quote model:",err);
})

export default Quote;







// import mongoose from "mongoose";

// const QuoteSchema = new mongoose.Schema(
//     {
//       text: { type: String, required: true },
//       author: { type: String, default: "Unknown" },
//       likes: { type: Number, default: 0 },
//       savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     },
//     { timestamps: true }
//   );


// export default mongoose.model("Quote", QuoteSchema);
