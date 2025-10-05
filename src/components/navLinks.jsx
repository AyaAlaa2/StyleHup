import React from "react";
import { PiFacebookLogoLight } from "react-icons/pi";
import { SlSocialInstagram, SlSocialTwitter } from "react-icons/sl";

export const headerLinks = [
  { title: "Home", path: "/" },
  { title: "Shop", path: "#" },
  { title: "New Arrivals", path: "#" },
  { title: "Sale", path: "#" },
  { title: "Blog", path: "#" },
  { title: "Contact", path: "/contact" },
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
