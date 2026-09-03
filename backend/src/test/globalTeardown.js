// Usado para detener la instancia MongoDB despues
// de que se ejecuten todos los tests.
export default async function globalTeardown() {
  // Instancia en memoria MongoMemoryServer
  await global.__MONGOINSTANCE.stop()

  // Instancia abierta con mongoose. Ya no es necesario
  // porque se logro crear la instancia de MongoDB
  // Memory Server para las pruebas de jest.
  //await global.__MONGOINSTANCE.connection.close()
}
