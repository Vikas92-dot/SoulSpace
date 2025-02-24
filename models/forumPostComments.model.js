import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";


const ForumPostComments = sequelize.define("forumPostComments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  commentText: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
sequelize.sync({alter: true})
.then(()=>{
    console.log("ForumComment model created...");
}).catch(err=>{
    console.log("Something wrong...");
    console.log(err);
});

export default ForumPostComments;
