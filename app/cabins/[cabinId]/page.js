import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";


// NOTE: this way we cannot send random id/name based on the page content
// export const metadata = {
//   title: "Cabin "
// }

// NOTE: this way we can send random id/name based on the page content.  funtion name must be generateMetadata  
export const generateMetadata = async ({ params }) => {
  const { cabinId } = params;
  const { name } = await getCabin(cabinId)

  return {
    title: `Cabin ${name}`
  }
}

// NOTE: This function provides all possible id's ahead of time so, all the pages with id can be statically generated.
// when we have finite set of ids and they are know, this is always a good idea to generate them statically.
export const generateStaticParams = async () => {
  const cabins = await getCabins();
  // cabinId is key as we have the parameter in the url named as cabinId 
  return cabins.map((cabin) => ({
    cabinId: String(cabin.id)
  }))
}


// NOTE: dynamic route segment will come in this params object. You can get the paremeter from here. Here our folder name is /cabins/[cabinId] so you will get cabinId in params as this is dynamic segment
export default async function Page({ params }) {
  const { cabinId } = params;
  // NOTE: This three server calls are blocking waterfalls, i.e each call is blocked by the previous one, untill first finishes second won't be executing and so on. 
  // solution : Promise.all()
  const cabin = await getCabin(cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(cabinId)

  // 1. solution, this works and better than previous one, but still not best, if one operation takes pretty long time others will still have to wait.
  // const [cabin, settings, bookedDates] = await Promise.all([getCabin(cabinId), getSettings(), getBookedDatesByCabinId(cabinId)])

  //NOTE: better solution: -> extract this operations in individual components and stream them when they are ready.Instead of fetching all the data in parent itself. 

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-500 mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        {/* Reservation section */}
        {/* NOTE: extracting this out to another component */}
        {/* <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
          <DateSelector />
          <ReservationForm />
        </div> */}

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
