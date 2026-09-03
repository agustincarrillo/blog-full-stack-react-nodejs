import { MongoMemoryServer } from 'mongodb-memory-server'
//import mongoose from 'mongoose'

export default async function globalSetup() {
  console.log('\nSetting up MongoDB Memory Server for testing (globalSetup)...')
  // Cuando se crea la instancia de MongoMemoryServer, se establece
  // binary.version a la version que se instalo para el contenedor Docker.
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '6.0.4',
    },
  })

  // Se guarda la instancia MongoDB como variable global para
  // acceder a ella en la funcion globalTeardown y en los tests.
  global.__MONGOINSTANCE = instance

  // Se guarda la URL para la conexion a la instancia de prueba.
  process.env.DATABASE_URL = instance.getUri()
}

/* Este codigo creaba una conexión a una instancia de MongoDB local, 
   pero ya no es necesario porque se logro crear la instancia de 
   MongoDB Memory Server para las pruebas de jest.
export default async function globalSetup() {
  console.log('\nSetting up MongoDB for testing (globalSetup)...')

  const uri = 'mongodb://localhost:27017'

  const instance = await mongoose.connect(uri)

  // Se guarda la instancia MongoDB como variable global para
  // acceder a ella en la funcion globalTeardown y en los tests.
  global.__MONGOINSTANCE = instance

  // Se guarda la URL para la conexion a la instancia de prueba.
  process.env.DATABASE_URL = uri

  console.log('Instance Succesful connection.')
}
*/
