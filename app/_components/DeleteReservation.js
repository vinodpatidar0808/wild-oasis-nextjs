"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from "react";
import { deleteReservationAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId }) {
  // NOTE: you can define server action here also. 
  // function deleteReservation() {
  //   // never forget this directive, we never know when this component become client component. (if some client component imports it it will behave as a client component)
  //   "use server"
  // try to keep server action in one place
  // }

  // NOTE: this hook was introduced in react 18, this indicates state updates in progress, without blocking the ui, UI will still be responsive and you can use this hook to indicate that some actions/state updates are in progress.
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (confirm("Are you sure, you want to delete this booking?")) {
      startTransition(() => deleteReservationAction(bookingId))
    }
  }

  return (
    <button onClick={handleDelete} className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'>
      {
        !isPending ?
          <>
            <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
            <span className='mt-1'>Delete</span>
          </> :
          <span className="mx-auto"><SpinnerMini /></span>

      }

    </button>
  );
}

export default DeleteReservation;
