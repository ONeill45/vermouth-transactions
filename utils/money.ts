export const formatDollarsAndCents = (amountCents: number) => {
  return `$${Math.floor(amountCents / 100)}.${amountCents % 100}`
}
