import {User} from '../../Configs/seqDb.js'
export interface IUserTestSeq {
    id: string
    email: string
    password: string
    nickname?: string | null
    name: string 
    picture?: string | null
    enabled: boolean
}
export interface CreateUserInput {
    email: string
    password: string
    nickname?: string | null
    name?: string |null
    picture?: string | null
    enabled: boolean
}
export type UpdateUserInput = Partial<CreateUserInput>

export const parser = (u: InstanceType<typeof User>): IUserTestSeq => {
  const raw = u.get() // u.get() da un objeto plano con todos los atributos
  return {
    id: raw.id,
    email: raw.email,
    password: raw.password,
    nickname: raw.nickname,
    name: raw.name,
    picture: raw.picture,
    enabled: raw.enabled
  }
}
export const dataCreate = {
  email: 'user@email.com',
  password: '123456',
  nickname: 'userTest',
  name: 'user',
  picture: 'https://picsum.photos/200?random=16',
}
export const dataUpdate: UpdateUserInput = {
  email: 'user@email.com',
  password: '123456',
  nickname: 'userTest',
  name: 'Name of user',
  picture: 'https://picsum.photos/200?random=16',
  enabled: true
}


//*--------------------------------------------------
//?          UserSeed
//*------------------------------------------------
export const createSeedRandomElements = async(model: any, seed:unknown[]) =>{
  try {
    if(!seed || seed.length===0)throw new Error('No data')
      await model.bulkCreate(seed)
  } catch (error) {
    console.error('Error createSeedRandomElements: ', error)
  }
}
export const usersSeed = [
  {
    email: "user1@email.com",
    password: "123456",
    nickname: "userTest1",
    name: "One",
    picture: "https://picsum.photos/200?random=1",
    enabled: true
  },
  {
    email: "user2@email.com",
    password: "123456",
    nickname: "userTest2",
    name: "Two",
    picture: "https://picsum.photos/200?random=2",
    enabled: true
  },
  {
    email: "user3@email.com",
    password: "123456",
    nickname: "userTest3",
    name: "Three",
    picture: "https://picsum.photos/200?random=3",
    enabled: true
  },
  {
    email: "user4@email.com",
    password: "123456",
    nickname: "userTest4",
    name: "Four",
    picture: "https://picsum.photos/200?random=4",
    enabled: true
  },
  {
    email: "user5@email.com",
    password: "123456",
    nickname: "userTest5",
    name: "Five",
    picture: "https://picsum.photos/200?random=5",
    enabled: true
  },
  {
    email: "user6@email.com",
    password: "123456",
    nickname: "userTest6",
    name: "Six",
    picture: "https://picsum.photos/200?random=6",
    enabled: false
  },
  {
    email: "user7@email.com",
    password: "123456",
    nickname: "userTest7",
    name: "Seven",
    picture: "https://picsum.photos/200?random=7",
    enabled: false
  },
  {
    email: "user8@email.com",
    password: "123456",
    nickname: "userTest8",
    name: "Eight",
    picture: "https://picsum.photos/200?random=8",
    enabled: true
  },
  {
    email: "user9@email.com",
    password: "123456",
    nickname: "userTest9",
    name: "Nine",
    picture: "https://picsum.photos/200?random=9",
    enabled: true
  },
  {
    email: "user10@email.com",
    password: "123456",
    nickname: "userTest10",
    name: "Ten",
    picture: "https://picsum.photos/200?random=10",
    enabled: true
  },
  {
    email: "user11@email.com",
    password: "123456",
    nickname: "userTest11",
    name: "Eleven",
    picture: "https://picsum.photos/200?random=11",
    enabled: true
  },
  {
    email: "user12@email.com",
    password: "123456",
    nickname: "userTest12",
    name: "Twelve",
    picture: "https://picsum.photos/200?random=12",
    enabled: true
  },
  {
    email: "user13@email.com",
    password: "123456",
    nickname: "userTest13",
    name: "Thirteen",
    picture: "https://picsum.photos/200?random=13",
    enabled: true
  },
  {
    email: "user14@email.com",
    password: "123456",
    nickname: "userTest14",
    name: "Fourteen",
    picture: "https://picsum.photos/200?random=14",
    enabled: true
  },
  {
    email: "user15@email.com",
    password: "123456",
    nickname: "userTest15",
    name: "Fifteen",
    picture: "https://picsum.photos/200?random=15",
    enabled: false
  }
];
