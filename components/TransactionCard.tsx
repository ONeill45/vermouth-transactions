import Image from 'next/image'

import CardIcon from '../components/icons/card.svg'
import { Transaction, TransactionType } from '../types'
import { formatDateTime, formatDollarsAndCents } from '../utils'

interface TransactionCardProps {
  transaction: Transaction
}
export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const { amountCents, cardLast4Digits, createdAt, description, direction } =
    transaction
  const formattedPrice = `${
    direction === TransactionType.CREDIT ? '-' : ''
  }${formatDollarsAndCents(amountCents)}`
  return (
    <div className="px-8 py-8 rounded-md text-black-900 bg-card shadow-lg flex justify-between">
      <div className="flex flex-col basis-1/3">
        <div className="text-2xl">{description}</div>
        <span className="text-base italic text-date">
          {formatDateTime(createdAt)}
        </span>
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
