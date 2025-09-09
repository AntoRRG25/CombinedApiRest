export interface IRepositoryResponse<T> {
  message: string
  results: T
}
export type Direction = 1 | -1 | 'ASC' | 'DESC'
export interface Order<TDTO> {
  field: keyof TDTO
  direction: Direction
}

export interface IPaginatedOptions<TDTO> {
  query?: Partial<Record<keyof TDTO, unknown>>
  page?: number
  limit?: number
  order?: Partial<Record<keyof TDTO, Direction>>
}

export interface IPaginatedResults<TDTO> {
  message: string
  info: { total: number, page: number, limit: number, totalPages: number }
  data: TDTO[]
}
export type TUpdate<T> = Partial<Omit<T, 'id'>>
export interface IBaseRepository<TDTO, TCreate, TUpdate> {
  getAll: (field?: unknown, whereField?: keyof TDTO | string) => Promise<IRepositoryResponse<TDTO[]>>
  getById: (id: string | number) => Promise<IRepositoryResponse<TDTO>>
  getByField: (field: unknown, whereField: keyof TDTO | string) => Promise<IRepositoryResponse<TDTO>>
  getWithPages: (options?: IPaginatedOptions<TDTO>) => Promise<IPaginatedResults<TDTO>>
  create: (data: TCreate) => Promise<IRepositoryResponse<TDTO>>
  update: (id: string | number, data: TUpdate) => Promise<IRepositoryResponse<TDTO>>
  delete: (id: string | number) => Promise<IRepositoryResponse<string>>
}
export interface IExternalImageDeleteService<T> {
  deleteImage: (imageInfo: T) => Promise<boolean>
}
export const mockImageDeleteService: IExternalImageDeleteService<any> = {
  deleteImage: async (_imageInfo: any) => await Promise.resolve(true)
}
