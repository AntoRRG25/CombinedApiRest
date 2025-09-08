import {Schema, model, type InferSchemaType } from "mongoose";


    const catalogSchema = new Schema({
        name: {type: String, required: true, unique:true},
        code: {type: String, required: true},
        description: {type:String, required: true},
        picture: {type:String, required: false},
        price: {type:Number, required: false},
        stock:{type: Number, default: 1, required: true},
        enabled: {type: Boolean, default: true, required: true}
    },{
        timestamps:true
    }
)
export type IMongooseCatalog = InferSchemaType<typeof catalogSchema>

const Catalog = model<IMongooseCatalog>('Catalog', catalogSchema)

export default Catalog