import mysql2 from 'mysql2'
import { connectionOptions } from '../config/datebase'
type Mysql2Type = typeof mysql2
type DBConnectOptionType = {
  host: string
  user: string
  password: string
  database: string
}
const connectDataBase = (mysql2: Mysql2Type, options: DBConnectOptionType) => {
  const { host, user, password, database } = options
  try {
    const connection = mysql2.createConnection({
      host,
      user,
      password,
      database,
    })
    return connection
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const connection = connectDataBase(mysql2, connectionOptions)

const getSQLData = async (sql: string) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}

export { connection, getSQLData }
