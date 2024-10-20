import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  // NOTE:Important -> this auth function relies on cookies which are only accessible on runtime, this this function gets cookies from request.This navigation component is being used inside global layout, which is used everywhere. This makes our entire app dynamic. ()
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>

          {session?.user?.image ?
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              {/* this referrerPolicy attribute is necessary to display some images coming from google. */}
              <img className="h-8 rounded-full " src={session.user.image} alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>
                {session.user.name}
              </span>
            </Link> :
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          }
        </li>
      </ul>
    </nav>
  );
}
