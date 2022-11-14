import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "../Section";
import Navlinks from "./Navlinks";
import ResponsiveNav from "./ResponsiveNav";

const HeaderTwo = () => {
  return (
    <Section className="nav-shadow">
      <Link href="/">
        <Image src="/images/Header/SH-Logo.png" width={200} height={50} />
      </Link>
      <Navlinks />
      <ResponsiveNav />
    </Section>
  );
};

export default HeaderTwo;
