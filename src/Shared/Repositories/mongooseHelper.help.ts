import { type HydratedDocument } from "mongoose";
import {IMongooseCatalog} from '../../../Schemas/catalog.ts'


export interface ICatalogTestMongoDb {
    id: string
    name: string
    code: string
    description: string | null
    picture?: string 
    price?: number | null
    stock: number
    enabled: boolean
}
export interface CreateCatalogInput {
    name: string
    code: string
    description: string | null
    picture?: string 
    price?: number | null
    stock: number
    enabled: boolean
}
export type UpdateCatalogInput = Partial<CreateCatalogInput>

export const parser = (u:  HydratedDocument<IMongooseCatalog>): ICatalogTestMongoDb=> {
  const raw = typeof u.toObject === 'function' ? u.toObject() : u;
  return {
    id: raw._id.toString(),
    name: raw.name,
    code: raw.code,
    description: raw.description,
    picture: raw.picture ?? '',
    price: raw.price ?? 0,
    stock: raw.stock,
    enabled: raw.enabled,
  }
}
export const dataCreate = {
 name: 'Wireless Mouse',
code: 'CAT000',
description: 'Ergonomic wireless mouse with adjustable DPI',
picture: 'https://picsum.photos/200?random=16',
price: 25.99,
stock: 120,
enabled: true
}
export const dataUpdate: UpdateCatalogInput = {
name: 'Wireless Mouse Genius',
code: 'CAT000',
description: 'Ergonomic wireless mouse with adjustable DPI',
picture: 'https://picsum.photos/200?random=16',
price: 25.99,
stock: 120,
enabled: true
}


//*--------------------------------------------------
//?          CatalogSeed
//*------------------------------------------------
export const createSeedRandomElementsMdb = async(model: any, seed:unknown[]) =>{
  try {
    if(!seed || seed.length===0)throw new Error('No data')
      await model.insertMany(seed)
  } catch (error) {
    console.error('Error createSeedRandomElementsMdb: ', error)
  }
}


export const catalogSeed: CreateCatalogInput[] = [
  {
    name: 'Wired Mouse',
    code: 'CAT001',
    description: 'Ergonomic wireless mouse with adjustable DPI',
    picture: '/images/mouse.jpg',
    price: 25.99,
    stock: 120,
    enabled: true
  },
  {
    name: 'Mechanical Keyboard',
    code: 'CAT002',
    description: 'RGB backlit mechanical keyboard with blue switches',
    picture: '/images/keyboard.jpg',
    price: 79.5,
    stock: 45,
    enabled: true
  },
  {
    name: 'USB-C Hub',
    code: 'CAT003',
    description: '7-in-1 USB-C hub with HDMI and card reader',
    price: 39.9,
    stock: 75,
    enabled: true
  },
  {
    name: 'Gaming Headset',
    code: 'CAT004',
    description: 'Surround sound gaming headset with microphone',
    picture: '/images/headset.jpg',
    price: 59.0,
    stock: 60,
    enabled: true
  },
  {
    name: 'Portable SSD 1TB',
    code: 'CAT005',
    description: 'High-speed portable SSD with USB 3.2',
    picture: '/images/ssd.jpg',
    price: 119.99,
    stock: 30,
    enabled: true
  },
  {
    name: 'Webcam HD',
    code: 'CAT006',
    description: '1080p webcam with built-in microphone',
    price: 49.0,
    stock: 25,
    enabled: false
  },
  {
    name: 'Smartwatch Basic',
    code: 'CAT007',
    description: 'Entry-level smartwatch with heart rate monitor',
    price: 69.9,
    stock: 100,
    enabled: true
  },
  {
    name: 'Bluetooth Speaker',
    code: 'CAT008',
    description: 'Portable speaker with 10h battery life',
    price: 34.5,
    stock: 80,
    enabled: false
  },
  {
    name: 'LED Desk Lamp',
    code: 'CAT009',
    description: 'Adjustable LED lamp with touch control',
    price: 22.0,
    stock: 150,
    enabled: true
  },
  {
    name: 'External Hard Drive 2TB',
    code: 'CAT010',
    description: 'Reliable 2TB external HDD',
    price: 89.9,
    stock: 40,
    enabled: true
  },
  {
    name: 'Wireless Charger',
    code: 'CAT011',
    description: 'Fast wireless charging pad (15W)',
    price: 18.75,
    stock: 200,
    enabled: true
  },
  {
    name: 'HDMI Cable 2m',
    code: 'CAT012',
    description: 'High-speed HDMI 2.1 cable, 2 meters',
    price: 9.99,
    stock: 300,
    enabled: false
  },
  {
    name: 'Laptop Stand',
    code: 'CAT013',
    description: 'Adjustable aluminum laptop stand',
    price: 27.5,
    stock: 90,
    enabled: true
  },
  {
    name: 'Noise Cancelling Earbuds',
    code: 'CAT014',
    description: 'Wireless earbuds with ANC',
    price: 99.0,
    stock: 55,
    enabled: true
  },
  {
    name: 'Smart LED Bulb',
    code: 'CAT015',
    description: 'Wi-Fi enabled LED bulb with app control',
    price: 12.5,
    stock: 400,
    enabled: false
  }
]
