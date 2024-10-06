import Link from "next/link"

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/cabins">Cabins</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/account">Your Account</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation