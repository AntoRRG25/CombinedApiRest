import { Sequelize } from 'sequelize'
import envConfig from './envConfig.js'
import models from '../../Models/index.js'

const sequelize = new Sequelize(envConfig.DatabaseUrl, {
  logging: false,
  native: false
})

Object.values(models).forEach((modelDef) => {
  modelDef(sequelize)
})

const { User } = sequelize.models
// Relations here below:

// ------------------------
//    Initilization database:
// -------------------------
async function startUp (syncDb: boolean = false, rewrite: boolean = false) {
  try {
    await sequelize.authenticate()
    if (envConfig.Status !== 'production' && syncDb === true) {
      try {
        await sequelize.sync({ force: rewrite })
        console.log(`🧪 Synced database: "force ${rewrite}"`)
      } catch (error) {
        console.error('❗Error syncing database', error)
      }
    }
    console.log('🟢​ Database initialized successfully!!')
  } catch (error) {
    console.error('❌ Error conecting database!', error)
  }
}
const closeDatabase = async () => {
  await sequelize.close()
  console.log('🛑 Database disconnect')
}

export { startUp, closeDatabase, sequelize, User }
