import React from "react";
import { PiFacebookLogoLight } from "react-icons/pi";
import { SlSocialInstagram, SlSocialTwitter } from "react-icons/sl";

export const headerLinks = [
  { title: "Home", path: "/" },
  { title: "Shop", path: "#" },
  { title: "New Arrivals", path: "/New" },
  { title: "Sale", path: "/Sale" },
  { title: "Blog", path: "/Blog" },
  { title: "Contact", path: "/Contact" },
];

export const shopLinks = [
  { title: "All", path: "all" },
  { title: "Men", path: "men" },
  { title: "Women", path: "women" },
  { title: "Kids", path: "kids" },
  { title: "Accessories", path: "accessories" },
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
