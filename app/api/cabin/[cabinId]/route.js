// NOTE: this route.js file can be in any folder which doesn't have a page.js file, page.js file returns html markup where as route.js returns json data., when a route gets called this both will be called which can create problem.

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";



// from this file we can export one or more function, each of them corresponds to an one of the http verbs

export async function GET(request, { params }) {
  // you can use Response, Request objects which are native and implemented in browsers as well
  // you can use extended versions of this 2 methods from nextjs, NextResponse and NextRequest 
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)])
    return Response.json({ cabin, bookedDates })
  } catch (error) {
    return Response.json({ message: "cabin not found." })
  }
}

export async function POST() {

}

// export async function PUT() { }