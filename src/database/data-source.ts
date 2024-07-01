import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data.db',
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
})
