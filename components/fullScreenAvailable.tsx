import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, spring } from "framer-motion";
import SimpleBar from "simplebar-react";

const ScreenVariants = {
  full: { width: "100%", margin: 0, borderRadius: 0, padding: "30px" },
  res: { width: "45%", margin: "2rem", borderRadius: "60px", padding: "20px" },
};

export const ToggleFullScreen = ({ children }) => {
  const [isSM, setSM] = useState(false);
  const [fullscreen, setFullScreen] = useState(true);
  useEffect(() => {
    setFullScreen(window.innerWidth <= 640);
  }, []);
  return (
    <div className="parent-container-pre-login ">
      <Image
        src="/svg/background.svg"
        style={{ objectFit: "cover" }}
        fill
        alt="Background SVG"
      />
      <motion.div
        className="content-container-pre-login relative"
        initial="full"
        variants={ScreenVariants}
        animate={fullscreen ? "full" : "res"}
        transition={spring}
        layout
      >
        <img
          src="/svg/mail-pilot-logo.svg"
          alt="Logo"
          className="logo-default my-2"
        />
        <img
          onClick={() => setFullScreen(!fullscreen)}
          src="/svg/fullscreen.svg"
          className=" hidden h-10 w-10 absolute top-5 right-5 cursor-pointer md:flex"
        />
        <SimpleBar className="px-5 w-full overflow-x-auto h-full">
          {children}
        </SimpleBar>
      </motion.div>
    </div>
  );
};
