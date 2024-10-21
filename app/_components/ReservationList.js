"use client"

import { useOptimistic } from 'react'
import { deleteReservationAction } from "../_lib/actions"
import ReservationCard from "./ReservationCard"

const ReservationList = ({ bookings }) => {
  // NOTE: from the name it is clear, this hook remains optimistic that something will surely happen and updates the UI untill the operation is being performed behind the scene. Making UI's more performant.
  // accepts 2 arguments, intitalState and updating function
  // first argument of the function will always be current state value and later arguments will be the parameters you pass in the function while calling it.
  // if background operation fails it will automatically restore bookings to previous state.
  const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (currBooking, bookingId) => {
    return currBooking.filter(booking => booking.id !== bookingId)
  })

  const handleDelete = async (bookingId) => {
    optimisticDelete(bookingId)
    await deleteReservationAction(bookingId)
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id} />
      ))}
    </ul>
  )
}

export default ReservationList