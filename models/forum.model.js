import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";


const ForumPost = sequelize.define("forumPost", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: true });


sequelize.sync().then(()=>{
    console.log("Forum model created.");
}).catch(err=>{
    console.log("Error in Forum model:",err);
})

export default ForumPost;
