// Usado para detener la instancia MongoDB despues
// de que se ejecuten todos los tests.
export default async function globalTeardown() {
  // Instancia en memoria MongoMemoryServer
  //await global.__MONGOINSTANCE.stop()
  // Instancia abierta con mongoose
  await global.__MONGOINSTANCE.connection.close()
}
