import { MongoClient, Sort } from 'mongodb'

export function getDBClient() {
  return MongoClient.connect(process.env.MONGODB_URL || '')
}
export function insertOneInCollection<T extends Object>(
  client: MongoClient,
  db: string,
  collection: string,
  data: T
) {
  return client.db(db).collection(collection).insertOne(data)
}

export function getAllCollectionDocuments(
  client: MongoClient,
  db: string,
  collection: string,
  sort: Sort
) {
  return client.db(db).collection(collection).find({}).sort(sort).toArray()
}
