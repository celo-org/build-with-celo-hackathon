import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, './db.json')
const adapter = new JSONFile(file)
export const db = new Low(adapter)

// in our showcase every test user session uses same user data / wallet 
const initDB = async () => {
    db.data ||= {
        "users": [
            {
                "id": 1,
                "name": "Placeholder_User",
                "email": "placeholder@zena.org",
                "pubKey": process.env.USER_ADDRESS,
                "privKey": process.env.USER_PRIVATE_KEY,
                "stats": {
                    "quiz1": 0,
                    "quiz2": 0,
                    "quiz3": 0,
                    "quiz4": 0,
                    "quiz5": 0,
                    "quiz6": 0,

                }
            }
        ]
    }
    await db.write()
}

export default initDB;
