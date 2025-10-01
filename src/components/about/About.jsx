import React from "react";
import OurStory from "./OurStory";
import OurMission from "./OurMission";
import Team from "./Team";
import OurValues from "./OurValues";
import ContactUs from "./ContactUs";
import HeaderOfPage from "./HeaderOfPage";

const About = () => {
  return (
    <div className="py-[20px]">
      <HeaderOfPage />
      <OurStory />
      <OurMission />
      <Team />
      <OurValues />
      <ContactUs />
    </div>
  );
};

export default About;
