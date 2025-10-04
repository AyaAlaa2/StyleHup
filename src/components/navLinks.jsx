import React from "react";
import { PiFacebookLogoLight } from "react-icons/pi";
import { SlSocialInstagram, SlSocialTwitter } from "react-icons/sl";

export const headerLinks = [
  { Link: "Home", path: "/" },
  { Link: "Shop", path: "#" },
  { Link: "New Arrivals", path: "/New" },
  { Link: "Sale", path: "/Sale" },
  { Link: "Blog", path: "/Blog" },
  { Link: "Contact", path: "/Contact" },
];


export const navLinks = [
  {
    title: "About Us",
    href: "/aboutUs",
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
    icon: <PiFacebookLogoLight className="text-[26px]" />,
    href: "https://facebook.com",
  },
];

