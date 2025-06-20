import { client } from '@/db/connection'
import { dbConfig } from '@/db/config'

console.log('Starting DB connection test...')
async function testDbConnection() {
  try {
    await client.connect()
    console.log('Connected to Neon DB - SUCCESS');

    const res = await client.query('SELECT NOW()')
    console.log('Server time: ', res.rows[0])

  } catch (error) {
    console.log('Not connected to Neon DB - FAILED', error)
  } finally {
    await client.end()
  }
}

(async () => {
  await testDbConnection()
  console.log('Finished DB connection test.')
})()
