import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    "SoulSpace",
    "root",
    "root",
    {
    host: "localhost",
    dialect: "mysql",
    logging: false,
 });
 
sequelize.authenticate()
.then(result=>{
    console.log("Database connnected...");
}).catch(err=>{
    console.log("Database not connected....");
    console.log(err);
});
export default sequelize;