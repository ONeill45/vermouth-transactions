// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Filters, Transaction } from '../../types'
import { setupDb, selectTransactions } from '../../database/transactions'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Transaction[]>
) {
  const filters = JSON.parse(req.body) as Filters
  const database = await setupDb()
  const transactions = await selectTransactions(filters)
  res.status(200).json(transactions)
}
