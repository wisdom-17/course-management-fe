import { describe, it, expect } from 'vitest'
import { formatDate } from '@/utils/dateTimeFormatters'

describe('formatDate', () => {
  it('returns a date in the dd/mm/yyyy format', () => {
    const date = new Date('2019-01-01T00:00:00.000Z')
    expect(formatDate(date)).toEqual('01/01/2019')
  })
})
