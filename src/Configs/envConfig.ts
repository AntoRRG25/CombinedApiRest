import dotenv from 'dotenv'

const ENV_FILES = {
  production: '.env',
  development: '.env.development',
  test: '.env.test'
} as const
type Environment = keyof typeof ENV_FILES

const NODE_ENV = (process.env.NODE_ENV as Environment) ?? 'production'

dotenv.config({ path: ENV_FILES[NODE_ENV] })

const getNumberEnv = (value: string | undefined, defaultValue: number): number => {
  return parseInt(value ?? defaultValue.toString(), 10)
}
const getStringEnv = (value: string | undefined, defaultValue: string): string => {
  return value ?? defaultValue
}

const envConfig = {
  Port: getNumberEnv(process.env.PORT, 3000),
  Status: NODE_ENV,
  DatabaseUrl: getStringEnv(process.env.DATABASE_URL, ''),
  MongoDbUri: getStringEnv(process.env.MONGO_DB_URI, '')
}

export default envConfig
