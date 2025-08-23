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
};

export const getSelectedThemes = async (id) => {
    try {
        const res = await db.query("SELECT * FROM themes WHERE id = $1", [id]);
        const response = res.rows;
        return response;
    } catch (error) {
        return error.message;
    }
};

export const editThemes = async (MyId, MyTitle, MyDescription) => {
    try {
        const res = await db.query("UPDATE themes SET title = $1, description = $2 WHERE id = $3", [MyTitle, MyDescription, MyId]);
        // affected rows
        if (res.rowCount > 0) {
            return res.rowCount;
        } else {
            return "Id does not exist";
        }
    } catch (error) {
        return error.message;
    }
    
};

export const deleteThemes = async (id) => {
    try {
        const res = await db.query("DELETE FROM themes WHERE id = $1", [id])
        if (res.rowCount > 0) {
            return res.rowCount;
        } else {
            return "Id does not exist"
        }
        
    } catch (error) {
        return error.message;
    }
};

export const createTheme = async (title, description) => {
    try {
        const res = await db.query("INSERT INTO themes (title, description) VALUES($1, $2)", [title, description]);
        if (res.rowCount > 0) {
            return res.rowCount;
        } else {
            return "create error";
        }

    } catch (error) {
        return error.message;
    }
    
};

export const getStories = async (theme_id) => {
    try {
        const res = await db.query("SELECT * FROM STORIES WHERE theme_id = $1", [theme_id])
        const response = res.rows;
        return response
    } catch (error) {
        return error.message;
    }
}; 

export const getTitle = async (theme_id) => {
    try {
        const res = await db.query("SELECT * from themes WHERE id = $1", [theme_id]);
        const response = res.rows;
        return response[0];
    } catch (error) {
        return error.message;
    }
}

export const createStory = async (title, dateTime, theme_id) => {
    try {
        const res = await db.query("INSERT INTO stories (title, theme_id, created_at) VALUES ($1, $2, $3)", [title, theme_id, dateTime]);
        if (res.rowCount > 0) {
            return res.rowCount;
        } else {
            return "createStory error";
        }
    } catch (error) {
        return error.message;
  }
};

export const getStory = async (id) => {
    try {
        const res = await db.query("SELECT * FROM stories WHERE id = $1", [id]);
        const response = res.rows;
        return response[0];
    } catch (error) {
        return error.message;
    }
}

export const updateStory = async (id, title, time) => {
    try {
        const res = await db.query("UPDATE stories SET title = $1, created_at = $2 WHERE id = $3", [title, time, id]);
        if (res.rowCount > 0) {
            return res.rowCount;
        } else {
            return "id was not found";
        }
        
    } catch (error) {
        return error.message;
    }
};

export const deleteStory = async (id) => {
    try {
        const res = await db.query("DELETE FROM stories WHERE id = $1", [id]);
        if (res.rowCount > 0) {
            return res.rowCount;
        } else {
            return "id not found";
        }
    } catch (error) {
        return error.message;
    }
    
};

export const getMarkDownText = async (id) => {
    try {
        const res = await db.query("SELECT description, title FROM stories WHERE id = $1", [id]);
        const response = res.rows;
        return response[0];
    } catch (error) {
        return error.message;
    } 
};

export const saveMdFile = async (text, id) => {
    try {
        const res = await db.query("UPDATE stories SET description = $1 WHERE id = $2", [text, id]);
        if (res.rowCount > 0) {
            return "saved successfully!";
        } else {
            return "error saving file";
        }
    } catch (error) {
        return error.message;
    }
}

