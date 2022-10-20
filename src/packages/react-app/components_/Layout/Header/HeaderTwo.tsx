import * as React from "react";
import Image from "next/image";
import Section from "../Section";
import Navlinks from "./Navlinks";
import ResponsiveNav from "./ResponsiveNav";

const HeaderTwo = () => {
  return (
    <Section className="nav-shadow">
      <a href="/">
        <Image src="/images/Header/SH-Logo.png" width={200} height={50} />
      </a>
      <Navlinks />
      <ResponsiveNav />
    </Section>
  );
};

export default HeaderTwo;
