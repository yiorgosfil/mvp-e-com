import { Pool, Client } from 'pg'
import { dbConfig } from './config'

export const pool = new Pool(dbConfig)
export const client = new Client(dbConfig)

