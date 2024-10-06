import logoImg from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* NOTE: this is really the most basic way in which you can use nextjs Image component there are other ways also in which you can use nextjs Image component. */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      {/* NOTE: using src as imported image, here you can omit heigt and width for the image. */}
      <Image src={logoImg} height={60} width={60} quality={100} alt="The Wild Oasis logo" />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
