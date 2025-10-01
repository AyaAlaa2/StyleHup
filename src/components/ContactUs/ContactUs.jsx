import React from "react";
import FormContact from "./FormContact";
import MapContact from "./MapContact";
import ContactInfo from "./ContactInfo";
import HeaderOfPage from "./HeaderOfPage";

const ContactUs = () => {
  return (
    <div className="py-[20px]">
      <HeaderOfPage />
      <FormContact />
      <MapContact />
      <ContactInfo />
    </div>
  );
};

export default ContactUs;
