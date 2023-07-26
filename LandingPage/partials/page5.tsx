import React from "react";
import { colors } from "../../styles";
import { motion } from "framer-motion";
import { ArrowOnHover } from "./arrowOnHover";

const quickLinks = [
  { label: "Warm" },
  { label: "Pricing" },
  { label: "About" },
  { label: "Reviews" },
];

const inquiries = [
  { label: "Join our Discord" },
  { label: "contact@mailpilot.ai" },
  { label: "Our Terms" },
  { label: "Your Privacy" },
];

export const Page5 = () => {
  return (
    <div className="landing_page5__container " id="landing_page5__container">
      <div
        className="grid grid-cols-2 md:grid-cols-11"
        style={{ paddingBottom: "150px"}}
      >
        <div className="col-span-2 md:col-span-5 flex-wrap pb-8 md:pb-0">
          <p className="text-4xl font-semibold">
            Subscribe to our newsletter to receive updates
          </p>
          <div
            className="flex items-center "
            style={{
              borderColor: colors.light200,
              borderBottomWidth: "1px",
              marginTop: "2vh",
            }}
          >
            <input
              className="input-email-address"
              placeholder="Your Email Address"
            />
            <img
              src="svg/arrow-right-black.svg"
              className="h-6 w-6 "
            />
          </div>
        </div>
        <div className="flex flex-col  md:col-span-3">
          <div className="md:place-self-center">
            <p className="text-light-300 ">QUICK LINKS</p>
            {quickLinks.map((i) => (
              <ArrowOnHover
                label={i.label}
                onClick={() => console.log(i.label)}
              />
            ))}
          </div>
        </div>
        <div className="col-span-1 flex flex-col  md:col-span-3">
          <div className=" md:self-center">
            <p className="text-light-300 ">INQUIRIES</p>
            {inquiries.map((i) => (
              <ArrowOnHover
                label={i.label}
                onClick={() => console.log(i.label)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex  gap-5 mb-4 ">
            {["twitter-dark", "linkedin-dark", "sight3-dark"].map((i) => (
              <div
                className="flex justify-center items-center "
                style={{
                  height: "46px",
                  width: "46px",
                  borderRadius: 100,
                  borderColor: colors.light200,
                  borderWidth: "1px",
                }}
              >
                <img src={"/svg/" + i + ".svg"} className=" h-6 w-6" />
              </div>
            ))}
          </div>
          <p className="text-light-300">© MailPilot. All right reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Page5;
