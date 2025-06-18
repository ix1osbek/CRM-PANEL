
import { Sequelize } from 'sequelize-typescript'

export const databaseConnect = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: "postgres",
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: "crm_panel"
            })
            sequelize.addModels([])
            await sequelize.sync();
            return sequelize;
        },
    },
];
