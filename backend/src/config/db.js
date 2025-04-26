import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

async function main(){
  const Mongo_URI = process.env.MONGO_URI
  const client = new MongoClient(Mongo_URI)

  try{
    await client.connect()
  } catch(e){
    console.error(e)
  }
}

main()

export default main