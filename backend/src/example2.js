import mongoose from 'mongoose'

const uri = 'mongodb://localhost:27017'

const instance = await mongoose.connect(uri)
//console.log('MongoDB Server started at:', instance)
console.log(instance.connections[0]._connectionString)

// Se guarda la instancia MongoDB como variable global para
// acceder a ella en la funcion globalTeardown y en los tests.
global.__MONGOINSTANCE = instance

// Se guarda la URL para la conexion a la instancia de prueba.
process.env.DATABASE_URL = uri
