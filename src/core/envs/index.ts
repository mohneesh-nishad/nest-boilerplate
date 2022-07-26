import * as dotenv from 'dotenv';
import { DEVELOPMENT, DOCKER } from '../constants';
dotenv.config()

const db_config = () => {
    const env = process.env.NODE_ENV
    const dialect = 'postgres'
    switch (env) {
        case DEVELOPMENT:
            return {
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME_DEVELOPMENT,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: process.env.DB_DIALECT || dialect,
                autoLoadModels: true,
                synchronize: true,
            }
            break;
        case DOCKER:
            return {
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME_DOCKER,
                host: 'postgres',
                port: process.env.DB_PORT,
                dialect: process.env.DB_DIALECT || dialect,
                autoLoadModels: true,
                synchronize: true,
            }
        default:
            break;
    }
}

export { db_config }