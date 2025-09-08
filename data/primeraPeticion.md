Perfecto, ya entendí lo que querés:
👉 Querés que tu **repository genérico** use internamente `mongoose.Model<IMongooseUser>` (u otros modelos), pero que hacia afuera siempre devuelva y acepte **tus interfaces DTO** (`IRepositoryResponse<T>`, `IPaginatedResults<TDTO>`, `UserDTO`, etc.), o sea, tipado plano sin los métodos/documentos de Mongoose.

Ese patrón se suele llamar **Repository + Mapper/Parser**. La idea es:

1. **Dentro del repo** trabajás con Mongoose.
2. **Fuera del repo** solo trabajás con tus DTOs.
3. Para traducir entre ambos, usás un `parserFunction` (mapper), que convierte de `IMongooseUser` → `UserDTO` (o lo que corresponda).

---

## Paso 1. Interfaces base (ya las tenés)

Las que mostraste (`IRepositoryResponse`, `IPaginatedOptions`, etc.) van perfectas para estandarizar.

---

## Paso 2. DTO plano para User

Podés definir un DTO explícito o directamente reusar tus tipos:

```ts
// dto/user.dto.ts
export interface UserDTO {
  id: string
  email: string
  nickname: string
  picture?: string
  name?: string
  role: number
  enabled: boolean
}
```

> Notá que acá ya no exponemos `password` ni el `_id` de Mongoose: usamos `id: string`.
> Esa diferencia la maneja el `parserFunction`.

---

## Paso 3. Repository genérico

El genérico recibe tres tipos:

* `TDTO` → lo que exponés afuera (ej: `UserDTO`)
* `TCreate` → lo que recibís al crear
* `TUpdate` → lo que recibís al actualizar

```ts
import { Model, Document } from "mongoose"
import {
  IBaseRepository,
  IRepositoryResponse,
  IPaginatedOptions,
  IPaginatedResults
} from "../interfaces/base.interface.js"

export class MongooseRepository<TDTO, TCreate, TUpdate, TMongoose extends Document>
  implements IBaseRepository<TDTO, TCreate, TUpdate> {

  private model: Model<TMongoose>
  private parser: (doc: TMongoose) => TDTO
  private modelName: string
  private whereField: keyof TDTO | string

  constructor(
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

  async getAll(): Promise<TDTO[]> {
    const docs = await this.model.find().exec()
    return docs.map(this.parser)
  }

  async getById(id: string): Promise<IRepositoryResponse<TDTO>> {
    const doc = await this.model.findById(id).exec()
    if (!doc) throw new Error(`${this.modelName} not found`)
    return { results: this.parser(doc) }
  }

  async getByField(field: unknown, whereField: keyof TDTO | string): Promise<IRepositoryResponse<TDTO>> {
    const doc = await this.model.findOne({ [whereField]: field }).exec()
    if (!doc) throw new Error(`${this.modelName} not found`)
    return { results: this.parser(doc) }
  }

  async getWithPages(options?: IPaginatedOptions<TDTO>): Promise<IPaginatedResults<TDTO>> {
    const page = options?.page ?? 1
    const limit = options?.limit ?? 10
    const skip = (page - 1) * limit

    const [docs, total] = await Promise.all([
      this.model.find(options?.query ?? {}).skip(skip).limit(limit).exec(),
      this.model.countDocuments(options?.query ?? {}).exec()
    ])

    return {
      info: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: docs.map(this.parser)
    }
  }

  async create(data: TCreate): Promise<IRepositoryResponse<TDTO>> {
    const doc = await this.model.create(data)
    return { results: this.parser(doc) }
  }

  async update(id: string, data: TUpdate): Promise<IRepositoryResponse<TDTO>> {
    const doc = await this.model.findByIdAndUpdate(id, data, { new: true }).exec()
    if (!doc) throw new Error(`${this.modelName} not found`)
    return { results: this.parser(doc) }
  }

  async delete(id: string): Promise<IRepositoryResponse<string>> {
    const doc = await this.model.findByIdAndDelete(id).exec()
    if (!doc) throw new Error(`${this.modelName} not found`)
    return { results: id }
  }
}
```

---

## Paso 4. Parser específico de User

```ts
import { IMongooseUser } from "../models/user.model.js"
import { UserDTO } from "../dto/user.dto.js"

export const userParser = (doc: IMongooseUser): UserDTO => ({
  id: doc._id.toString(),
  email: doc.email,
  nickname: doc.nickname,
  picture: doc.picture,
  name: doc.name,
  role: doc.role,
  enabled: doc.enabled
})
```

---

## Paso 5. Instanciación del UserRepository

```ts
import User, { IMongooseUser } from "../models/user.model.js"
import { UserDTO } from "../dto/user.dto.js"
import { userParser } from "../mappers/user.mapper.js"
import { MongooseRepository } from "./mongoose.repository.js"

export const userRepository = new MongooseRepository<
  UserDTO,
  Omit<UserDTO, "id"> & { password: string }, // TCreate
  Partial<Omit<UserDTO, "id">>,              // TUpdate
  IMongooseUser
>(
  User,
  userParser,
  "User",
  "email" // campo de búsqueda principal
)
```

---

✅ Con esto:

* Internamente usás Mongoose con tipado fuerte.
* Externamente solo devolvés/recibís tus DTOs.
* El parser hace de frontera y evita exponer `_id`, `__v`, `password`, métodos, etc.

---

¿Querés que te prepare también la **versión tipada para `toObject()`** (por si preferís serializar directo con `doc.toObject()` en lugar de un parser manual)?
