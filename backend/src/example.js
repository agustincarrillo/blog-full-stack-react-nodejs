import initDatabase from './db/init.js'
import { Post } from './db/models/post.js'

process.env.DATABASE_URL = 'mongodb://localhost:27017/blog'

await initDatabase()

// Creacion de un objeto Post
const post = new Post({
  title: 'Hello Mongoose!',
  author: 'Agustin Carrillo',
  contents:
    'Este post esta almacenado en una base de datos MongoDB usando Mongoose.',
  tags: ['mongoose', 'mongodb'],
})

// Guarda el objeto Post
const createdPost = await post.save()

await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'Hello Again Mongoose!' },
})

// Recupera posts utilizando el modelo
const posts = await Post.find()
console.log(posts)
