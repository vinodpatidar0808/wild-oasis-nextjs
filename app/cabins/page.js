import { Suspense } from 'react';
import CabinList from "../_components/CabinList";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
import Spinner from "../_components/Spinner";

// NOTE: the value here needs to be some actual value and not a computation.
// The value is used to revalidate the page on the server.
// value = 0, will opt out this page from data cache which also opt outs from full route cache.
// you can use any number, this will be miliseconds, this is how you do ISR (incremental static regeneration).
export const revalidate = 3600;

export const metadata = {
  title: "Cabins"
}


// NOTE: you can call this component anything you like but many people use "Page"
// NOTE: this searchParams is only available in page.js
const Page = async ({ searchParams }) => {

  const filters = searchParams?.capacity ?? "all"

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* NOTE: Suspense does not need filters but navigation in nextjs are wrapped inside react transitions which are omitted by Suspense after their first appearance, so to make this suspense work with every iteration pass uniqaue key value like we do in lists */}
      <Suspense fallback={<Spinner />} key={filters}>
        <CabinList filters={filters} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

export default Page