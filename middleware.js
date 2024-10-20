// import { NextResponse } from "next/server"
// this auth function does a lot of things, provides session, acts as middleware also.
import { auth } from '@/app/_lib/auth';

// NOTE: middlewares by default run for every request. So this middleware will run for all request including /about route which will form infinte loop.
// when you export config this middleware will run only for /account routes
// export function middleware(request) {
//   console.log("request: ", request)

//   return NextResponse.redirect(new URL('/about', request.url))
// }


export const middleware = auth;

// NOTE: using matcher to run middleware for specific routes.
export const config = {
  // matcher: array of all the routes for which middleware should run
  matcher: ["/account"]
}