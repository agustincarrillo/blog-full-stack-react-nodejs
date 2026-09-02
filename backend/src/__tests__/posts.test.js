import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from '../services/posts.js'
import { Post } from '../db/models/post.js'

describe('creating posts', () => {
  // Se define una prueba para crear un post con todos los parámetros requeridos
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Mongoose!',
      author: 'Agustin Carrillo',
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }
    const createdPost = await createPost(post)
    // Se espera que le ID del objeto creado sea una instancia de ObjectId de Mongoose.
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id)
    // Se espera que foundPost sea igual un objeto conteniendo al menos las propiedades
    // del objeto post original.
    expect(foundPost).toEqual(expect.objectContaining(post))
    // Se espera que el post creado tenga las propiedades createdAt y updatedAt,
    // y que ambas sean instancias de Date.
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  // Se define una segunda prueba para intentar crear un post sin el parámetro 'title',
  // lo cual debería fallar.
  test('without title should fail', async () => {
    const post = {
      author: 'Agustin Carrillo',
      contents: 'Post with no title',
      tags: ['empty'],
    }
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  // Se define una tercera prueba para crear con parametros minimos.
  // Debería ser exitosa y solo ingresar el titulo.
  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

const samplePosts = [
  { title: 'Learning Redux', author: 'Daniel Bugl', tags: ['redux'] },
  { title: 'Learn React Hooks', author: 'Daniel Bugl', tags: ['react'] },
  {
    title: 'Full-Stack React Projects',
    author: 'Daniel Bugl',
    tags: ['react', 'nodejs'],
  },
  { title: 'Guide to TypeScript' },
]

let createdSamplePosts = []

beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }
})

describe('listing posts', () => {
  test('should return all posts', async () => {
    const posts = await listAllPosts()
    expect(posts.length).toEqual(createdSamplePosts.length)
  })

  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts()
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    )

    // La funcion map aplica una funcion a cada elemento de un arreglo y devuelve
    // el resultado. En nuestro caso, seleccionamos la propiedad createdAt de todos
    // los elementos del arreglo. No podemos comparar directamente los arreglos
    // contra el otro porque Mongoose devuelve documentos con un monton de informacion
    // adicional en metadatos ocultos, que Jest intentaria comparar.
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })

  test('ahould take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(posts.map((post) => post.updateAt)).toEqual(
      sortedSamplePosts.map((post) => post.updateAt),
    )
  })

  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor('Daniel Bugl')
    expect(posts.length).toBe(3)
  })

  test('shoud be able to filter posts by tag', async () => {
    const posts = await listPostsByTag('nodejs')
    expect(posts.length).toBe(1)
  })
})

describe('getting a post', () => {
  test('should return the full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })

  test('should fail if id does not exists', async () => {
    const post = await getPostById('000000000000000000000000')
    expect(post).toEqual(null)
  })
})

describe('updating posts', () => {
  test('should update the specific propery', async () => {
    await updatePost(createdSamplePosts[0]._id, { author: 'Test Author' })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.author).toEqual('Test Author')
  })

  test('should not update other properties', async () => {
    await updatePost(createdSamplePosts[0]._id, { author: 'Test Author' })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.title).toEqual('Learning Redux')
  })

  test('should update the updatedAt timestamp', async () => {
    await updatePost(createdSamplePosts[0]._id, { author: 'Test Author' })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    )
  })

  test('should fail if the id does not exists', async () => {
    const post = await updatePost('000000000000000000000000', {
      author: 'Test Author',
    })
    expect(post).toEqual(null)
  })
})

describe('delete posts', () => {
  test('should remove the post from the database', async () => {
    const result = await deletePost(createdSamplePosts[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(deletedPost).toEqual(null)
  })

  test('should fail if the id does not exists', async () => {
    const result = await deletePost('000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})
