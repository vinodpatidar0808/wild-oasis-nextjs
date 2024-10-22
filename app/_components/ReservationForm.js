"use client"

import { differenceInDays } from "date-fns";
import { createReservationAction } from "../_lib/actions";
import { useReservation } from "./ReservationContext";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate)
  const cabinPrice = numNights * (regularPrice - discount)

  const bookingData = {
    startDate, endDate, numNights, cabinPrice, cabinId: id
  }

  // NOTE: we need additional data in action, 
  // 1. one solution we used earlier was using a hidden form field, not feasible when we have more than 1 or 2 data points, we have to create input field for each value
  // 2. good method: use bind

  const createReservationWithData = createReservationAction.bind(null, bookingData)

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

        <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createReservationWithData}
        action={async (formData) => {
          await createReservationWithData(formData)
          resetRange()
        }}
        className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'>
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          {!(startDate && endDate) ? (<p p className='text-primary-300 text-base'>Start by selecting dates</p>) : (
            <SubmitButton pendingLabel={"Reserving..."}>Reserve now</SubmitButton>)}
        </div>
      </form >
    </div >
  );
}

export default ReservationForm;
