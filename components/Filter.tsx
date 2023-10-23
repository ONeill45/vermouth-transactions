import { ChangeEvent, useState } from 'react'

interface FilterProps {
  title: string
  field: string
  filterType?: string
  filterOptions?: string[]
  value: string
  setValue: (e: ChangeEvent) => void
}
export const Filter = ({
  title,
  field,
  filterType = 'select',
  filterOptions,
  value,
  setValue,
}: FilterProps) => {
  if (filterType === 'select') {
    return (
      <div className="flex flex-col">
        <div className="font-bold text-[#444] text-xs">{title}</div>
        <select
          className="w-24 h-6 bg-[#EFEFEF] border border-[#898989] rounded"
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setValue(e)}
          name={field}
        >
          <option value=""></option>
          {filterOptions?.map((option) => {
            return (
              <option value={option} key={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
  if (filterType === 'input') {
    return (
      <div className="flex flex-col">
        <div className="font-bold text-[#444] text-xs">{title}</div>
        <div className="w-24 h-6 bg-[#EFEFEF] border border-[#898989] rounded flex items-center">
          <div className="w-4 h-6">$</div>
          <input
            className="w-20 h-6 transparent-input"
            value={(Number(value) / 100).toString()}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e)}
            name={field}
            type="number"
            min={0}
          />
        </div>
      </div>
    )
  }

  return <div></div>
}
