import { Link } from "react-router-dom";
import { navLinks, socialLinks } from "./navLinks";

const Footer = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-start md:items-center text-[#757575] px-[20px] py-[40px]">
      <ul className="container flex flex-col md:flex-row gap-[30px] capitalize text-[16px] font-normal justify-around items-start">
        {navLinks.map((link, idx) => (
          <li
            key={idx}
            className="hover:text-gray-800 transition-color duration-400"
          >
            <Link to={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-row gap-[20px] text-[20px] items-center justify-center font-bold">
        {socialLinks.map((link, idx) => (
          <Link to={link.href} key={idx} target="_blank">
            {link.icon}
          </Link>
        ))}
      </div>
      <div>
        <p className="text-[16px]">
          &copy; 2024 Fashion Forward. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
