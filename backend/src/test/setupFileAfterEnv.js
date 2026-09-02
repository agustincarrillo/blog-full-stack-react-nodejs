import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'

import { initDatabase } from '../db/init.js'

// Inicializa la conexion a la base de datos antes de ejecutar los tests.
beforeAll(async () => {
  await initDatabase()
})

// Cierra la conexion despues de que se ejecuten todos los tests.
afterAll(async () => {
  await mongoose.disconnect()
})
