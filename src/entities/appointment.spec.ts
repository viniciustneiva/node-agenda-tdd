import { expect, test } from 'vitest'
import { getFutureDate } from '../tests/utils/get-future-date'
import { Appointment } from './appointment'

test('create an appointment', () => {
  const startsAt = getFutureDate('2022-11-15')
  const endsAt = getFutureDate('2022-11-16')
  
  const appointment = new Appointment({
    customer: "John Doe",
    startsAt,
    endsAt
  })
  
  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual("John Doe")
})

test('cannot create an appointment when the end date is sooner than start date', () => {
  const startsAt = getFutureDate('2022-11-15')
  const endsAt = getFutureDate('2022-11-14')
  
  
  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt
    })
  }).toThrowError()
})

test('cannot create an appointment when the start date before now', () => {
  const startsAt = new Date()
  const endsAt = new Date()
  startsAt.setDate(startsAt.getDate() -1)
  endsAt.setDate(endsAt.getDate() +1)
  
  
  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt
    })
  }).toThrowError()
})