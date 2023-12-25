import mysql2 from 'mysql2'
import { connection } from './dbConnect'
export const initDB = () => {
  connection.query('SELECT * FROM user_tbl', function (error, results, fields) {
    if (error) throw error
  })
  // connection.end()
  return connection
}
