import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    contents: String,
    tags: [String],
  },
  {
    timestamps: true,
  },
)

// Crea el modelo Mongoose a partir del esquema definido.
// El primer parámetro 'post' es el nombre de la colección, se
// pone en singular y Mongoose lo pluraliza automáticamente.
export const Post = mongoose.model('post', postSchema)
