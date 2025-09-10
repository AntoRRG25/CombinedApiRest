import { beforeAll, afterAll, describe, it, expect} from 'vitest'
import {resetDatabase, closeMongoDb} from '../../Configs/mongoDb.ts'
import Catalog, {ICatalogDocument} from '../../../Schemas/catalog.ts'
import {MongooseRepository} from './MongooseRepository.ts'
import * as help from './mongooseHelper.help.ts'
import * as store from '../../../test/helpers/testStore.help.ts'



describe('MongooseRepository unit test', () => {
    beforeAll(async()=>{
        await resetDatabase()
    })
    afterAll(async()=>{
    await closeMongoDb()
    })
    const test = new MongooseRepository<
  help.ICatalogTestMongoDb,
  help.CreateCatalogInput,
  help.UpdateCatalogInput,
  ICatalogDocument // 👈 en vez de InstanceType<typeof Catalog>
>(Catalog, help.parser, 'Catalog', 'name')
    describe('Create method', () => {
        it('should create a element', async() => {
            const response = await test.create(help.dataCreate)
            expect(response.message).toBe('Catalog name created successfully')
            expect(response.results).toEqual({
                id: expect.any(String),
                name: 'Wireless Mouse',
                code: 'CAT000',
                description: 'Ergonomic wireless mouse with adjustable DPI',
                picture: 'https://picsum.photos/200?random=16',
                price: 25.99,
                stock: 120,
                enabled: true
                    })
            store.setStringId(response.results.id)
        })
    })
    describe('Get methods', () => {
        describe('"getAll" method', () => {
        it('should retrieve an array of elements', async() => {
            await help.createSeedRandomElementsMdb(Catalog, help.catalogSeed)
            const response = await test.getAll()
            expect(response.message).toBe('Catalog records retrieved successfully')
            expect(response.results.length).toBe(16)
        })
        it('Should retrieve an array of elements filtered by query', async() => {
             const response = await test.getAll('false', 'enabled')
            expect(response.message).toBe('Catalog records retrieved successfully')
            expect(response.results.length).toBe(4)
        })
        })
        describe('"getById" method', () => { 
            it('Should retrieve an element by Id', async() => {
             const response = await test.getById(store.getStringId())
            expect(response.message).toBe('Catalog record retrieved successfully')
            expect(response.results).toEqual({
                id: expect.any(String),
                name: 'Wireless Mouse',
                code: 'CAT000',
                description: 'Ergonomic wireless mouse with adjustable DPI',
                picture: 'https://picsum.photos/200?random=16',
                price: 25.99,
                stock: 120,
                enabled: true
            })
          })
        })
        describe('"getByField" method', () => { 
            it('Should retrieve an element by field', async() => {
             const response = await test.getByField("Wireless Mouse", 'name')
            expect(response.message).toBe('Catalog record retrieved successfully')
            expect(response.results).toEqual({
                id: expect.any(String),
                name: 'Wireless Mouse',
                code: 'CAT000',
                description: 'Ergonomic wireless mouse with adjustable DPI',
                picture: 'https://picsum.photos/200?random=16',
                price: 25.99,
                stock: 120,
                enabled: true
            })
            
        })
      })
      describe('"getWithPages" method', () => { 
         it('Should retrieve an array of paginated elements', async() => {
            const queryObject = {page:1, limit:10,}
             const response = await test.getWithPages(queryObject)
            expect(response.message).toBe('Total records: 16. Catalogs retrieved successfully')
            expect(response.info).toEqual({ total: 16, page: 1, limit: 10, totalPages: 2 })
            expect(response.data.length).toBe(10)
             expect(response.data.map(a => a.code)).toEqual(["CAT000", "CAT001","CAT002", "CAT003", "CAT004", "CAT005", "CAT006", "CAT007", "CAT008", "CAT009"])// Order
        })
         it('Should retrieve filtered and sorted elements', async() => {
            const queryObject = {page:1, limit:10,query:{enabled: false}, order: { code: -1}} as const
             const response = await test.getWithPages(queryObject)
            expect(response.message).toBe('Total records: 4. Catalogs retrieved successfully')
            expect(response.info).toEqual({ total: 4, page: 1, limit: 10, totalPages: 1 })
            expect(response.data.length).toBe(4)
            console.log('cuenta: ',response.data.map(a => a.code))
            expect(response.data.map(a => a.code)).toEqual(["CAT006", "CAT008", "CAT012", "CAT015"])// Order
        })
      })

    })
    describe('Update method', () => {
        it('should update an element', async() => {
            const data ={name: 'Wireless Mouse Genius'}
            const response = await test.update(store.getStringId(), data)
            expect(response.results).toEqual({
                id: expect.any(String),
                ...help.dataUpdate 
            })
        })
    })
    describe('Delete method', () => {
        it('should deleted an element', async() => { 
            const response = await test.delete(store.getStringId())
            expect(response.message).toBe('Catalog item deleted successfully')
        })
    })
})
