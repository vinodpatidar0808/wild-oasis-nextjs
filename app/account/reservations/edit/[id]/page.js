import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservationAction } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

const Page = async ({ params }) => {
  const { id } = params
  // const maxCapacity = 23;
  const { numGuests, observations, cabinId } = await getBooking(id)
  const { maxCapacity } = await getCabin(cabinId)

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{id}
      </h2>

      <form action={updateReservationAction} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        {/* NOTE: we need this booking id to be passed in formData this is one and easy way to do it. There is another way also. */}
        <input type="text" hidden name="bookingId" value={id} />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations || ""}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {/* <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update reservation
          </button> */}
          <SubmitButton pendingLabel="Updating...">Update reservation</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default Page