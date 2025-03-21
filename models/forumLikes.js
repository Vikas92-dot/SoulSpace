import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const ForumPostLikes = sequelize.define("forumPostLikes",{
  id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  }
});

sequelize.sync()
.then(()=>{
    console.log("ForumLikes model created...");
}).catch(err=>{
    console.log("Something wrong...");
    console.log(err);
});

export default ForumPostLikes;
