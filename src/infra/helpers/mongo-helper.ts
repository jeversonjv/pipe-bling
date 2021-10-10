import { MongoClient } from 'mongodb'

export default {
  conn: null,

  async connect (uri): Promise<void> {
    this.conn = await MongoClient.connect(uri)
  },

  async getCollection (name: string): Promise<any> {
    const db = await this.conn.db()
    return db.collection(name)
  },

  async close (): Promise<void> {
    await this.conn.close()
  }
}
