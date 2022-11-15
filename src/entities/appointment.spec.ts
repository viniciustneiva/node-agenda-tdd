import { expect, test } from 'vitest'
import { Appointment } from './appointment'

test('create an appointment', () => {
    const startsAt = new Date()
    const endsAt = new Date()

    endsAt.setDate(endsAt.getDate() +1)
    const appointment = new Appointment({
        customer: "John Doe",
        startsAt,
        endsAt
    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toEqual("John Doe")
})

test('cannot create an appointment when the end date is sooner than start date', () => {
    const startsAt = new Date()
    const endsAt = new Date()

    endsAt.setDate(endsAt.getDate() -1)

    expect(() => {
        return new Appointment({
            customer: "John Doe",
            startsAt,
            endsAt
        })
    }).toThrowError()
})