// import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

const CabinList = async ({ filters }) => {
  // NOTE: this no store opt-outs this component of caching behavirour, but this is not stable yet. Opting out a component from cache optouts entire route from cache and makes it dynamic again.
  // this will be more helpful in partial pre-rendering.
  // noStore();
  const cabins = await getCabins();

  if (!cabins.length) {
    return null
  }

  let displayedCabins;
  if (filters === "all") {
    displayedCabins = cabins;
  } else if (filters === "small") {
    displayedCabins = cabins.filter(cabin => cabin.maxCapacity <= 3)
  } else if (filters === "medium") {
    displayedCabins = cabins.filter(cabin => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7)
  } else if (filters === 'large') {
    displayedCabins = cabins.filter(cabin => cabin.maxCapacity >= 8)
  }


  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  )
}

export default CabinList