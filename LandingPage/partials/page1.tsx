import React, { useRef } from "react";
import Button from "../../components/button";
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  console.log("useParallax", value);
  return useTransform(value, [0, 400], [0, distance]);
}

function useParallaxSM(value: MotionValue<number>, distance: number) {
  console.log("useParallax", value);
  return useTransform(value, [500, 1000], [0, distance]);
}

const imgVariants = {
  initial: { scale: 0 },
  to: {
    scale: 1,
  },
};

const data = [
  {
    path: "Image.svg",
    className: "hidden absolute md:flex",
    style: { right: 0, top: "5vh", width: "14vw" },
    parallaxDistance: -50,
  },
  {
    path: "Image-1.svg",
    className: "hidden absolute md:flex",
    style: { right: 0, bottom: "2vh", width: "22vw", height: "22vw" },
    parallaxDistance: 40,
  },
  {
    path: "Image-2.svg",
    className: "hidden absolute md:flex",
    style: { bottom: "8vh", width: "20vw", height: "20vw", left: 0 },
    parallaxDistance: 50,
  },

  {
    path: "Image-3.svg",
    className: "hidden absolute md:flex",
    style: { top: "2vh", height: "22vw", left: 0 },
    parallaxDistance: 45,
  },

  {
    path: "Image-4.svg",
    className: "hidden absolute md:flex",
    style: { left: "5vh", top: "1vh", width: "25vw" },
    parallaxDistance: 30,
  },

  {
    path: "Image-5.svg",
    className: "hidden absolute md:flex",
    style: { left: "5vh", bottom: "0.5vh", width: "20vw" },
    parallaxDistance: -30,
  },

  {
    path: "Image-6.svg",
    className: "hidden absolute md:flex",
    style: { right: "5vh", top: "2vh", width: "28vw" },
    parallaxDistance: 35,
  },
  {
    path: "Image-7.svg",
    className: "hidden absolute md:flex",
    parallaxDistance: 55,
    style: { width: "15vw", right: 0 },
  },
  {
    path: "Image-8.svg",
    className: "hidden absolute md:flex",
    style: { left: 0, width: "15vh" },
    parallaxDistance: -55,
  },
  {
    path: "Image-9.svg",
    className: "hidden absolute md:flex",
    parallaxDistance: -45,
    style: { right: "2vh", bottom: "5vh", width: "16vw" },
  },
  {
    path: "Image-10.svg",
    className: "hidden absolute md:flex",
    style: { right: "5vh", bottom: "2vh", width: "24vw" },
    parallaxDistance: -35,
  },
];

const dataSM = [
  {
    path: "Image.svg",
    className: " absolute ",
    style: { left: 0, bottom: 0, width: "90vw" },
    parallaxDistance: -50,
  },
  {
    path: "Image-1.svg",
    className: " absolute ",
    style: { right: 0, top: 0, width: "90vw" },

    parallaxDistance: 35,
  },
  {
    path: "Image-2.svg",
    className: " absolute ",
    style: { top: "5vw", width: "50vw", left: "2vw" },
    parallaxDistance: 40,
  },

  {
    path: "Image-3.svg",
    className: " absolute ",
    style: { right: 0, width: "30vw", top: "20vw" },
  },

  {
    path: "Image-4.svg",
    className: " absolute ",
    style: { left: "30vw", bottom: "15vw", width: "35vw" },
    parallaxDistance: 30,
  },

  {
    path: "Image-5.svg",
    className: " absolute ",
    style: { left: 0, bottom: "30vw", width: "35vw" },
    parallaxDistance: -40,
  },

  {
    path: "Image-6.svg",
    className: " absolute ",
    style: { left: "20vw", bottom: "40vw", width: "35vw" },
    parallaxDistance: 50,
  },
];

export const Page1 = ({ scrollY, openJoinBetaModal }) => {
  const ref = useRef();
  return (
    <div id="landing_page1__container">
      <div className="landing_page1__container relative" ref={ref}>
        {data.map((i, index) => (
          <motion.img
            // drag
            // draggable
            transition={{ type: "spring" }}
            variants={imgVariants}
            initial="initial"
            animate="to"
            src={`/svg/LandingPage/${i.path}`}
            className={i.className}
            style={{
              y: useSpring(useParallax(scrollY, i.parallaxDistance), {
                stiffness: 300,
              }),
              ...i.style,
            }}
          />
        ))}
        <div className="landing_page1__content-container z-40 my-[10vh] md:my-[20vh]">
          <p className="landing_page1_heading text-[11vw] md:text-[5vw]">
            Meet ✏️ Milo, the only AI companion you’ll need.
          </p>
          <p className="landing_page1_sub-heading text-[5vw] md:text-[2vw]">
            The first link to securing new leads is with MailPilot
          </p>
          <Button
            title="Join Beta"
            preset="primary"
            containerStyle={{ width: "120px" }}
            onPress={openJoinBetaModal}
            cursor={false}
          />
        </div>
      </div>
      <div className="relative flex md:hidden" style={{ height: "80vw" }}>
        {dataSM.map((i, index) => (
          <motion.img
            transition={{ type: "spring" }}
            src={`/svg/LandingPageSM/${i.path}`}
            className={i.className}
            style={{
              y: useSpring(useParallaxSM(scrollY, i.parallaxDistance), {
                stiffness: 300,
              }),
              ...i.style,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Page1;
