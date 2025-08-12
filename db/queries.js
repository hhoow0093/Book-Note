import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config()

const db = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

db.connect();


export const getThemes = async () => {
    try {
        const res = await db.query("SELECT * FROM themes");
        const response = res.rows;
        return response;
    } catch (error) {
        return error.message;
    }
}

const editThemes = 1;
const deleThemes = 2;

// 1. impletement live search, delete and edit button in themes
// 2. add check button feature to check each notes from themes

