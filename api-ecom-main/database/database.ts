require('dotenv').config()
//require mongoose module
import mongoose from "mongoose"
import chalk from "chalk"
import fs from 'fs'
import path from 'path'
import { CategoryModel } from './models/category.model'
import { ProductModel } from './models/product.model'

//require database URL from properties file
const dbURL = process.env.DATABASE_URL
  || `mongodb://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@${process.env.HOST_DB || 'localhost'}:${process.env.PORT_DB || '27017'}/main?authSource=admin`
const connected = chalk.bold.cyan
const error = chalk.bold.yellow
const disconnected = chalk.bold.red
const termination = chalk.bold.magenta

const seedDatabase = async () => {
  const mapMongoJSON = (data: any[]) => data.map(item => {
    let newItem = { ...item }
    if (newItem._id && newItem._id.$oid) newItem._id = newItem._id.$oid
    if (newItem.category && newItem.category.$oid) newItem.category = newItem.category.$oid
    if (newItem.createdAt && newItem.createdAt.$date) newItem.createdAt = newItem.createdAt.$date
    if (newItem.updatedAt && newItem.updatedAt.$date) newItem.updatedAt = newItem.updatedAt.$date
    return newItem
  })

  try {
    const categoryCount = await CategoryModel.countDocuments()
    if (categoryCount === 0) {
      console.log(chalk.yellow('Seeding Categories...'))
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../main.categories.json'), 'utf-8'))
      await CategoryModel.insertMany(mapMongoJSON(data))
      console.log(chalk.green('Seeded Categories successfully.'))
    }

    const productCount = await ProductModel.countDocuments()
    if (productCount === 0) {
      console.log(chalk.yellow('Seeding Products...'))
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../main.products.json'), 'utf-8'))
      await ProductModel.insertMany(mapMongoJSON(data))
      console.log(chalk.green('Seeded Products successfully.'))
    }
  } catch (err) {
    console.error(chalk.red('Error seeding database:'), err)
  }
}

//export this function and imported by server.js
export const connectMongoDB = async () => {
  let dbUrlToUse = dbURL
  let isMemoryDB = false

  if (process.env.USE_MEMORY_DB === 'true') {
    isMemoryDB = true
    const { MongoMemoryServer } = require('mongodb-memory-server')
    const dbPath = path.join(__dirname, '../../.local-db')
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath, { recursive: true })
    }

    console.log(chalk.yellow(`Starting MongoMemoryServer with persistent dbPath at ${dbPath}...`))
    const mongod = await MongoMemoryServer.create({
      instance: {
        dbPath: dbPath,
        port: 27018
      }
    })
    dbUrlToUse = mongod.getUri()
  }

  await mongoose.connect(dbUrlToUse, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

  mongoose.connection.on("connected", function () {
    console.log(connected(`Mongoose default connection is open to ${isMemoryDB ? 'Local Memory DB' : 'MongoDB'}`))
  })

  mongoose.connection.on("error", function (err) {
    console.log(
      error("Mongoose default connection has occured " + err + " error")
    )
  })

  mongoose.connection.on("disconnected", function () {
    console.log(disconnected("Mongoose default connection is disconnected"))
  })

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      )
      process.exit(0)
    })
  })

  if (isMemoryDB) {
    await seedDatabase()
  }
}

export const isValidId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id)
}
