import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* <Navigation /> */}
      <h1>The Wild oasis! Welcome to paradise</h1>
      {/* using anchor tag to navigate, refresh the page. Full page load. */}
      {/* <a href="/cabins">Explore Luxury Cabins</a> */}
      <Link href="/cabins">Explore Luxury Cabins</Link>
    </div>
  );
}
