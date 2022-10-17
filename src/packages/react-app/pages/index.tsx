import Hero from "@/components_/HomePage/Hero";
import Features from "@/components_/Features";
import * as React from "react";
import Stats from "@/components_/HomePage/Stats";
import FuturePlan from "@/components_/HomePage/FuturePlan";

const index = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Stats/>
      <FuturePlan />
    </div>
  )
}

export default index