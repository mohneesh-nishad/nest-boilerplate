import * as dotenv from 'dotenv';
dotenv.config()

const db_config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    autoLoadModels: true,
    synchronize: true,
}

export { db_config }