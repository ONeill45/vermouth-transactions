export enum TransactionType {
  CREDIT = 'Credit',
  DEBIT = 'Debit',
}

export enum TransactionStatus {
  PENDING = 'pending',
  SETTLED = 'settled',
}

export type Transaction = {
  status: TransactionStatus
  amountCents: number
  merchantName: string
  description: string
  cardLast4Digits: string
  createdAt: string
  direction: TransactionType
}

export type Filters = {
  minAmount?: string
  maxAmount?: string
  status?: string
  card?: string
  merchant?: string
}
