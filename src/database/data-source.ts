import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data.db',
  logging: false,
  entities: ['./src/api/**/entity/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  subscribers: [],
})
