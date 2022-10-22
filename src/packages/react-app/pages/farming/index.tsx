import React from "react";
import NewsLetter from "@/components_/Newsletter";
import Features from "@/components_/Features";
import FarmingPage from "@/components_/FarmingPage";
import CommonHero from "@/components_/CommonHero";
import { farmingHeroText } from "@/data";

const Farming = () => {
  return (
    <>
      <CommonHero heading={farmingHeroText.heading} paragraph={farmingHeroText.paragraph} buttonText={farmingHeroText.buttonText} />
      <FarmingPage />
      <Features />
      <NewsLetter />
    </>
  );
};

export default Farming;
