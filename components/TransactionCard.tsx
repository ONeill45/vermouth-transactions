import { ChangeEvent, useState } from 'react'
import Image from 'next/image'

import CardIcon from '../components/icons/card.svg'
import { Transaction, TransactionStatus, TransactionType } from '../types'
import { formatDateTime, formatDollarsAndCents } from '../utils'

interface TransactionCardProps {
  transaction: Transaction
}
export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const {
    amountCents,
    cardLast4Digits,
    createdAt,
    description,
    direction,
    status,
  } = transaction
  const formattedPrice = `${
    direction === TransactionType.CREDIT ? '-' : ''
  }${formatDollarsAndCents(amountCents)}`

  const [memo, setMemo] = useState<string>('')

  const handleMemoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setMemo(value)
  }
  return (
    <div className="px-8 py-8 rounded-md text-black-900 bg-card shadow-lg flex justify-between">
      <div className="flex flex-col basis-1/3">
        <div className="flex flex-row">
          <div className="text-2xl">{description}</div>
          {status === TransactionStatus.PENDING && (
            <div className="w-20 bg-[#FFF7AB] rounded-xl flex items-center justify-center ml-8 text-xs border border-[#B7B7B7]">
              {TransactionStatus.PENDING.toLocaleUpperCase()}
            </div>
          )}
        </div>
        <span className="text-base italic text-date">
          {formatDateTime(createdAt)}
        </span>
        <input value={memo} onChange={handleMemoChange} />
      </div>
      <div className="flex flex-row justify-around items-center basis-1/3">
        <div className="flex flex-row items-center">
          <Image src={CardIcon} alt="Credit card" />
          <div className="text-2xl font-bold ml-5">{`x${cardLast4Digits}`}</div>
        </div>
        <div className="text-2xl font-bold">{formattedPrice}</div>
      </div>
    </div>
  )
}
