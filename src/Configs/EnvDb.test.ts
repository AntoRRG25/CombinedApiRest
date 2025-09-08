import {describe, it, expect, beforeAll, afterAll }from 'vitest'
import envConfig from './envConfig.ts'
import {resetDatabase, closeMongoDb} from './mongoDb.ts'
import {startUp, closeDatabase, User} from './seqDb.ts'
import Catalog from '../../Schemas/catalog.ts'

describe('EnvDb test.', () => { 
  beforeAll(async()=>{
    await startUp(true, true)
    await resetDatabase()
  })
  afterAll(async()=>{
    await closeDatabase()
    await closeMongoDb()
  })
  describe('Environment variables', () => {
    it('should return the correct environment status and database variable', () => { 
         const formatEnvInfo =
      `Server running in: ${envConfig.Status}\n` +
      `Testing sequelize database: ${envConfig.DatabaseUrl}`+
      `Testing mongoDb database: ${envConfig.MongoDbUri}`;
    expect(formatEnvInfo).toBe(
      "Server running in: test\n" + "Testing sequelize database: postgres://postgres:antonio@localhost:5432/testing"+"Testing mongoDb database: mongodb://127.0.0.1:27017/herethenameofdb"
    );
    })
  })
  describe('Sequelize database', () => {
    it('should query tables and return an empty array', async() => { 
       const models = [User];
    for (const model of models) {
      const records = await model.findAll();
      expect(Array.isArray(records)).toBe(true);
      expect(records.length).toBe(0);
    }
    })
  })
  describe('MongoDb database', () => {
    it('should query tables and return an empty array', async() => { 
       const models = [Catalog];
    for (const model of models) {
      const records = await model.find();
      expect(Array.isArray(records)).toBe(true);
      expect(records.length).toBe(0);
    }
    })
  })
})