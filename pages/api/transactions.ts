// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Filters, Transaction } from '../../types'
import { setupDb, selectTransactions } from '../../database/transactions'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Transaction[]>
) {
  const database = await setupDb()
  let transactions
  if (req.method === 'POST') {
    const filters = JSON.parse(req.body) as Filters
    transactions = await selectTransactions(filters)
  } else {
    transactions = await selectTransactions()
  }

  res.status(200).json(transactions)
}
