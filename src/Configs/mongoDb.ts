import mongoose from 'mongoose'
import envConfig from './envConfig.js'

async function connectDB () {
  try {
    await mongoose.connect(envConfig.MongoDbUri)
    console.log('DB conectada exitosamente ✅')
  } catch (error) {
    console.error(error + ' algo malo pasó 🔴')
  }
}
//* Funciones para testing
const resetDatabase = async () => {
  try {
    await mongoose.connect(envConfig.MongoDbUri)
    // Asegurarse de empezar en una BD vacía
    await mongoose.connection.dropDatabase()
    // Asegura que se creen los índices
    // await Test.syncIndexes()
    console.log('Índices sincronizados')
    console.log('Base de datos MongoDB inicializada correctamente ✔️')
  } catch (error) {
    console.error('Error inicializando DB MongoDB ❌', error)
  }
}
const closeMongoDb = async () => {
  try {
    await mongoose.disconnect()
    console.log('Conexión MongoDB cerrada ✔️')
  } catch (error) {
    console.error('Error cerrando conexión MongoDB ❌', error)
  }
}

export {
  connectDB,
  resetDatabase,
  closeMongoDb
}
