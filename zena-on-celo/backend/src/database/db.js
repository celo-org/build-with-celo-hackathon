import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, './db.json')
const adapter = new JSONFile(file)
export const db = new Low(adapter)

const initDB = async () => {
    db.data ||= {
        "users": [
            {
                "id": 1,
                "name": "Blue",
                "pubKey": "0x61a5A64861c839f8F4D9fAA1F6b6F06052BA1C1B",
                "privKey": process.env.USER_PRIVATE_KEY,
                "stats": {
                    "quiz1": 0,
                    "quiz2": 0,
                    "quiz3": 0,
                    "quiz4": 0
                }
            }
        ]
    }
    await db.write()
}

export default initDB;
