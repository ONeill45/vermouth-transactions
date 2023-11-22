// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Filters, Transaction } from '../../types'
import { setupDb, selectTransactions } from '../../database/transactions'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Transaction[]>
) {
  const database = await setupDb()
  let returnedTransaction
  const transaction = JSON.parse(req.body)
  returnedTransaction = await updateTransaction(transaction)

  res.status(200).json(returnedTransaction)
}
