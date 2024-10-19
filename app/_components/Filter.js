"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";


const Filter = () => {

  // NOTE: to get params here you will have to use useSearchParams hook in client component which is provided by nextjs, in server component you get url params from searchParams prop in component
  const searchParams = useSearchParams();

  // NOTE: this useRouter hook is provided by nextjs in next/navigation module which helps you navigate programmatically
  const router = useRouter();

  // NOTE: this usePathname() hook provide  the url path.
  const pathname = usePathname()

  const activeFilter = searchParams.get("capacity") ?? "all"

  const handleFilter = (filter) => {
    // NOTE: URLSearchParams is a web API available in javascript and has nothing to do with nextjs
    const params = new URLSearchParams(searchParams);
    //  NOTE: you can add or remove new parameters here 
    params.set('capacity', filter)
    // note: this scroll property is used to control whether page will be scrolled to top or not. 
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }
  return (
    <div className="border border-primary-800 flex ">
      {/* <button onClick={() => handleFilter('all')} className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === "all" ? "bg-primary-700 text-primary-50" : ""}`}>
        All cabins
      </button> */}
      <Button filter="all" handleFilter={handleFilter} activeFilter={activeFilter}>All Cabins</Button>
      <Button filter="small" handleFilter={handleFilter} activeFilter={activeFilter}>1&mdash;3</Button>
      <Button filter="medium" handleFilter={handleFilter} activeFilter={activeFilter}>4&mdash;7</Button>
      <Button filter="large" handleFilter={handleFilter} activeFilter={activeFilter}>8&mdash;12</Button>
    </div>
  )
}

const Button = ({ filter, activeFilter, handleFilter, children }) => {

  return (
    <button onClick={() => handleFilter(filter)} className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter ? "bg-primary-700 text-primary-50" : ""}`}>
      {children}
    </button>
  )
}

export default Filter