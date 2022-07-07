
/* db.js */

import { Client } from 'mysql'

const home = Deno.env.get('HOME')
console.log(`HOME: ${home}`)

const connectionData = {
  '/home/codio':  {
    hostname: '127.0.0.1',
    username: 'websiteuser',
    password: 'websitepassword',
    db: 'website'
  },
  '/app': {
		hostname: 'HOSTNAME',
    username: 'USERNAME',
    password: 'PASSWORD',
    db: 'DATABASE'
  }
}

const conn = connectionData[home]
console.log(conn)

const db = await new Client().connect(conn)

export { db }
