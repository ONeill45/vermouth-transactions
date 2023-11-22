import { DataTypes, Op, Sequelize } from 'sequelize'

import { baseData } from './seed'
import { Filters, Transaction } from '../types'

let TransactionTable
const filepath = '.data/transactions.db'

export const dbConnection = new Sequelize('database', '', '', {
  dialect: 'sqlite',
  storage: filepath,
  logging: true,
})

export const setupDb = async (): Promise<void> => {
  dbConnection.authenticate().then(async (err) => {
    console.log(`SQLite3 Connection has been established successfully.`)
  })

  TransactionTable = dbConnection.define('Transaction', {
    status: DataTypes.STRING,
    amountCents: DataTypes.NUMBER,
    merchantName: DataTypes.STRING,
    description: DataTypes.STRING,
    cardLast4Digits: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    direction: DataTypes.STRING,
    memo: DataTypes.STRING,
  })

  await TransactionTable.sync()
  if (!(await TransactionTable.findOne())) {
    await setup()
  }
}

async function setup() {
  await TransactionTable.destroy({ where: {} })
  for (const transaction of baseData) {
    await TransactionTable.create(transaction)
  }
}

export const insertTransaction = async (transaction: Transaction) => {
  await TransactionTable.create(transaction)
}

export const selectTransactions = async (filters?: Filters) => {
  let whereClause: any = {}
  if (filters) {
    const { minAmount, maxAmount, card, merchant, status } = filters
    if (minAmount) {
      whereClause.amountCents = {
        [Op.gte]: Number(minAmount),
      }
    }
    if (maxAmount && Number(maxAmount) > 0) {
      whereClause.amountCents = {
        [Op.lte]: Number(maxAmount),
      }
    }
    if (card) {
      whereClause.cardLast4Digits = {
        [Op.eq]: card,
      }
    }
    if (merchant) {
      whereClause.merchantName = {
        [Op.eq]: merchant,
      }
    }
    if (status) {
      whereClause.status = {
        [Op.eq]: status,
      }
    }
  }

  return await TransactionTable.findAll({
    order: ['createdAt'],
    where: whereClause,
  })
}
// TODO: add method to get filter options (card, merchant) at
// beginning so it's not tied to current records returned
