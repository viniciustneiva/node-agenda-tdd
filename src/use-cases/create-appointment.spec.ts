import { describe, expect, it } from "vitest"
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memoty-appointment-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment"

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    
    const startsAt = getFutureDate('2022-11-14')
    const endsAt = getFutureDate('2022-11-16')
    
    const appointmentRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentRepository);

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })

  it("should not be able to create an appointment with overlapping dates", async () => {
    const startsAt = getFutureDate('2022-11-14')
    const endsAt = getFutureDate('2022-11-22')
    
    const appointmentRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentRepository);

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    expect(createAppointment.execute({
      customer: "John Doe",
      startsAt: getFutureDate('2022-11-16'),
      endsAt: getFutureDate('2022-11-18'),
    })).rejects.toBeInstanceOf(Error)
  })
})