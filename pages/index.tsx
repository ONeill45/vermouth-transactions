import type { NextPage } from 'next'
import { ChangeEvent, useEffect, useState } from 'react'
import { Filter, TransactionCard } from '../components'
import { Filters, Transaction, TransactionStatus } from '../types'

const Home: NextPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [cardOptions, setCardOptions] = useState<string[]>()
  const [merchantOptions, setMerchantOptions] = useState<string[]>()
  const [filters, setFilters] = useState<Filters>({
    minAmount: '',
    maxAmount: '',
    card: '',
    merchant: '',
    status: '',
  })

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(filters),
    })
    const data = await response.json()
    setTransactions(data)
  }

  // separately pull the card and merchant options so they don't change as
  // transactions are filtered
  const getFilterOptions = async () => {
    const response = await fetch('/api/transactions')
    const data = (await response.json()) as Transaction[]
    setCardOptions([
      ...new Set(data.map((transaction) => transaction.cardLast4Digits)),
    ])
    setMerchantOptions([
      ...new Set(data.map((transaction) => transaction.merchantName)),
    ])
  }

  useEffect(() => {
    fetchTransactions()
  }, [filters])

  useEffect(() => {
    getFilterOptions()
  }, [])

  const handleFilters = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    let formattedValue = value
    if (['minAmount', 'maxAmount'].includes(name)) {
      formattedValue = (Number(value) * 100).toString()
    }
    setFilters((existingFilters) => ({
      ...existingFilters,
      [name]: formattedValue,
    }))
  }

  return (
    <div className="w-full h-full">
      <div className="m-10">
        <h1 className="text-3xl font-semibold">Transactions</h1>
        <div className="flex flex-row gap-4">
          <Filter
            title="Min Amount"
            field="minAmount"
            filterType="input"
            value={filters?.minAmount}
            setValue={handleFilters}
          />
          <Filter
            title="Max Amount"
            field="maxAmount"
            filterType="input"
            value={filters?.maxAmount}
            setValue={handleFilters}
          />
          <Filter
            title="Status"
            field="status"
            filterOptions={Object.values(TransactionStatus)}
            value={filters?.status}
            setValue={handleFilters}
          />
          <Filter
            title="Card"
            field="card"
            filterOptions={cardOptions}
            value={filters?.card}
            setValue={handleFilters}
          />
          <Filter
            title="Merchant"
            field="merchant"
            filterOptions={merchantOptions}
            value={filters?.merchant}
            setValue={handleFilters}
          />
        </div>
        <div className="flex flex-col gap-8 mt-10">
          {transactions &&
            transactions.map((transaction: any, index: number) => (
              <TransactionCard key={index} transaction={transaction} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
