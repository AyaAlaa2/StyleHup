import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const FAQs = [
  {
    q: "What payment methods do you accept?",
    a: "We accept a variety of payment methods, including credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. All transactions are processed securely to ensure your information is protected.",
  },
  {
    q: "How do I track my order?",
    a: "We accept a variety of payment methods, including credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. All transactions are processed securely to ensure your information is protected.",
  },
  {
    q: "What is your return policy?",
    a: "We accept a variety of payment methods, including credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. All transactions are processed securely to ensure your information is protected.",
  },
  {
    q: "How long does shipping take?",
    a: "We accept a variety of payment methods, including credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. All transactions are processed securely to ensure your information is protected.",
  },
  {
    q: "Do you offer international shipping?",
    a: "We accept a variety of payment methods, including credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. All transactions are processed securely to ensure your information is protected.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  const HandelOpen = (i) => {
    setOpen(open === i ? null : i);
  };
  return (
    <div className="py-[20px]">
      <h1 className="text-4xl font-bold py-8">Frequently Asked Questions</h1>
      <div className="p-[16px] flex flex-col gap-[12px]">
        {FAQs.map((FAQ, index) => (
          <div
            className="border-1 border-[#E0E0E0] rounded-lg px-[15px] py-[7px]"
            key={index}
          >
            <button
              className="flex justify-between items-center w-full cursor-pointer"
              onClick={() => HandelOpen(index)}
            >
              <span className="font-medium text-[14px] leading-[21px] py-2 text-[#141414]">
                {FAQ.q}
              </span>
              <span>
                {open === index ? (
                  <IoIosArrowUp className="text-[20px] text-[#141414]" />
                ) : (
                  <IoIosArrowDown className="text-[20px] text-[#141414]" />
                )}
              </span>
            </button>
            {open === index && (
              <p className="font-normal text-[14px] leading[21px] text-[#757575] pb-2">
                {FAQ.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
