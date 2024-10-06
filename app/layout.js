
// when you have multiple words in font names like this, you import it like this using underscore (_)
import { Josefin_Sans } from "next/font/google"

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap'

})

import "@/app/_styles/globals.css"
import Header from "./_components/Header"
// you can add more metadata here, and customize the title of each page also.
export const metadata = {
  // title: 'The Wild Oasis!',
  title: {
    template: "%s | The Wild Oasis",
    default: 'Welcome | The Wild Oasis',
  },
  description: 'Luxurious hotels located in the heart of Benguluru, India.',
}


// NOTE: root layout is required
export default function RootLayout({ children }) {
  return (
    // NOTE: in root layout both html and body tags are required
    <html lang="en">
      <body className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-1 px-8 py-12">

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
