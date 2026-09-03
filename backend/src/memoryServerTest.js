import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'

async function startMemoryServer() {
  const instance = await MongoMemoryServer.create()
  const uri = instance.getUri()
  console.log('MongoDB Memory Server started at:', uri)

  const client = new MongoClient(uri)
  await client.connect()

  const db = client.db('test') // Nombre de la base de datos de prueba
  const collection = db.collection('posts') // Nombre de la colección de prueba

  await collection.insertMany([
    { title: 'Post 1', contents: 'Contenido del post 1' },
    { title: 'Post 2', contents: 'Contenido del post 2' },
    { title: 'Post 3', contents: 'Contenido del post 3' },
  ])
  const post = await collection.findOne({ title: 'Post 1' })
  console.log('Post insertado en la base de datos de prueba:', post)

  setTimeout(async () => {
    await client.close()
    await instance.stop()
    console.log('MongoDB Memory Server stopped.')
  }, 5000) // Detener el servidor después de 5 segundos
}

startMemoryServer().catch((error) => {
  console.error('Error starting MongoDB Memory Server:', error)
})
