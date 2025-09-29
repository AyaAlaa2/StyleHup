import React from "react";
import { PiFacebookLogoLight } from "react-icons/pi";
import { SlSocialInstagram, SlSocialTwitter } from "react-icons/sl";

export const navLinks = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
  {
    title: "Customer Service",
    href: "/cusromerService",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Terms of Service",
    href: "/termsOfService",
  },
];

export const socialLinks = [
  {
    icon: <SlSocialTwitter />,
    href: "https://x.com/",
  },
  {
    icon: <SlSocialInstagram />,
    href: "https://instagram.com",
  },
  {
    icon: <PiFacebookLogoLight className="text-[30px]" />,
    href: "https://facebook.com",
  },
];
