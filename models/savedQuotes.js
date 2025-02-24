import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";


const SavedQuotes = sequelize.define("savedQuotes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});


sequelize.sync()
  .then(() => console.log("SavedQuotes table created"))
  .catch((err) => console.log("Error in SavedQuotes model:", err));

export default SavedQuotes;
