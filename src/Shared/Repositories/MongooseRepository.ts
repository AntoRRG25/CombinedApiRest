import { type Model, type Document, type FilterQuery, type UpdateQuery } from 'mongoose'
import { type IBaseRepository, type IRepositoryResponse, type IPaginatedOptions, type IPaginatedResults } from '../Interfaces/base.interface.js'
import { throwError } from '../../Configs/errorHandlers.js'

export class MongooseRepository<TDTO, TCreate, TUpdate extends UpdateQuery<TMongoose>, TMongoose extends Document>
implements IBaseRepository<TDTO, TCreate, TUpdate> {
  private readonly model: Model<TMongoose>
  private readonly parser: (doc: TMongoose) => TDTO
  private readonly modelName: string
  private readonly whereField: keyof TDTO | string

  constructor (
    model: Model<TMongoose>,
    parser: (doc: TMongoose) => TDTO,
    modelName: string,
    whereField: keyof TDTO | string
  ) {
    this.model = model
    this.parser = parser
    this.modelName = modelName
    this.whereField = whereField
  }

  async getAll (field?: unknown, whereField?: keyof TDTO | string): Promise<IRepositoryResponse<TDTO[]>> {
    const whereClause: FilterQuery<TMongoose> =
    field && whereField ? { [whereField]: field } as FilterQuery<TMongoose> : {}
    const docs = await this.model.find(whereClause).exec()
    return {
      message: `${this.modelName}s fields retrieved succesfully`,
      results: docs.map(this.parser)
    }
  }

  async getById (id: string | number): Promise<IRepositoryResponse<TDTO>> {
    const doc = await this.model.findById(id.toString()).exec()
    if (!doc) throwError(`${this.modelName} not found`, 404)
    return {
      message: `${this.modelName} field retrieved succesfully`,
      results: this.parser(doc)
    }
  }

  async getByField (field?: unknown, whereField?: keyof TDTO | string): Promise<IRepositoryResponse<TDTO>> {
    const whereClause: FilterQuery<TMongoose> =
    field && whereField ? { [whereField]: field } as FilterQuery<TMongoose> : {}
    const doc = await this.model.findOne(whereClause).exec()
    if (!doc) throwError(`${this.modelName} not found`,404)
    return {
      message: `${this.modelName} field retrieved succesfully`,
      results: this.parser(doc)
    }
  }

  async getWithPages (options?: IPaginatedOptions<TDTO>): Promise<IPaginatedResults<TDTO>> {
    const page = options?.page ?? 1
    const limit = options?.limit ?? 10
    const skip = (page - 1) * limit
    const filter: FilterQuery<TMongoose> = (options?.query ?? {}) as FilterQuery<TMongoose>

    const [docs, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit).exec(),
      this.model.countDocuments(filter).exec()
    ])

    return {
      message: `${this.modelName}s fields retrieved succesfully`,
      info: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: docs.map(this.parser)
    }
  }

  async create (data: TCreate): Promise<IRepositoryResponse<TDTO>> {
    const doc = await this.model.create(data)
    return {
      message: `${this.modelName} created succesfully`,
      results: this.parser(doc)
    }
  }

  async update (id: string | number, data: TUpdate): Promise<IRepositoryResponse<TDTO>> {
    const doc = await this.model.findByIdAndUpdate(id.toString(), data, { new: true }).exec()
    if (!doc) throwError(`${this.modelName} not found`, 404)
    return {
      message: `${this.modelName} updated succesfully`,
      results: this.parser(doc)
    }
  }

  async delete (id: string | number): Promise<IRepositoryResponse<string>> {
    const doc = await this.model.findByIdAndDelete(id.toString()).exec()
    if (!doc) throwError(`${this.modelName} not found`,404)
    return {
      message: `${this.modelName} item deleted successfully`,
      results: ''
    }
  }
}
