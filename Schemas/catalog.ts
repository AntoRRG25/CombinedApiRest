import {Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";


    const catalogSchema = new Schema({
        name: {type: String, required: true, unique:true},
        code: {type: String, required: true},
        description: {type:String, required: true},
        picture: {type:String, required: false},
        price: {type:Number, required: false},
        stock:{type: Number, default: 1, required: true},
        enabled: {type: Boolean, default: true, required: true}
    },{
        timestamps:false
    }
)
export type IMongooseCatalog = InferSchemaType<typeof catalogSchema>
export type ICatalogDocument = HydratedDocument<IMongooseCatalog>

const Catalog = model<ICatalogDocument>('Catalog', catalogSchema)

export default Catalog
