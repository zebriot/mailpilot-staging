import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/button";
import Page5 from "./page5";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { colors } from "../../styles";

let timeoutId;
let lastIntervalId;
const LookingForwardItemVariantsMD = {
  hidden: {
    opacity: 0,
    top: "10vw",
    // scaleY: 0,
  },
  visible: {
    opacity: 1,
    top: 0,
    // scaleY: 1,
  },
};

const LookForwardScrollMD = ({ spring }: { spring: MotionValue<any> }) => {
  const handleChildMouseEnter = () => {
    const mainScroll = document.getElementById("landing_page5__container");
    // Disable scrolling on the parent when the cursor enters the child element
    mainScroll.style.overflow = "hidden";
  };

  const handleChildMouseLeave = () => {
    const mainScroll = document.getElementById("landing_page5__container");
    // Enable scrolling on the parent when the cursor leaves the child element
    mainScroll.style.overflow = "auto";
  };

  const [currentSection, setCurrentSection] = useState(0);
  const lookForwardScrollRef = useRef<HTMLDivElement>(null);
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({
    container: lookForwardScrollRef,
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(spring, "change", (latest) => {
    clearTimeout(timeoutId);
    const parentWidth = document.getElementById(
      "look-forward-scroll-md"
    ).offsetWidth;
    console.log("scrollX3", latest, parentWidth);

    if (latest < 0.3) {
      setCurrentSection(0);
      return;
    }
    if (latest < 0.7) {
      setCurrentSection(1);

      return;
    }
    setCurrentSection(2);
  });

  return (
    <div className=" relative flex flex-row items-center">
      <motion.div
        ref={lookForwardScrollRef}
        id="look-forward-scroll-md"
        className="flex flex-col overflow-scroll "
        style={{
          // as per the ratio of the images i am  using
          width: "35vw",
          height: "41.9vw",
          alignSelf: "center",
        }}
      >
        <motion.img
          variants={LookingForwardItemVariantsMD}
          animate={currentSection === 0 ? "visible" : "hidden"}
          ref={img1}
          initial="hidden"
          src="/svg/scroll-content-1.svg"
          style={{
            width: "35vw",
            height: "auto",
            // opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.4, 0.4]),
          }}
          className=" absolute"
        />
        <motion.img
          variants={LookingForwardItemVariantsMD}
          animate={currentSection === 1 ? "visible" : "hidden"}
          ref={img2}
          initial="hidden"
          src="/svg/scroll-content-2.svg"
          style={{
            width: "35vw",
            height: "auto",
            // opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]),
          }}
          className=" absolute"
        />
        <motion.img
          initial="hidden"
          variants={LookingForwardItemVariantsMD}
          animate={currentSection === 2 ? "visible" : "hidden"}
          ref={img3}
          src="/svg/scroll-content-3.svg"
          style={{
            width: "35vw",
            height: "auto",
            // opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 1]),
          }}
          className=" absolute"
        />
        <div
          className="flex grow z-30 bg-transparent"
          style={{
            lineHeight: "2000px",
            width: "100%",
          }}
        >
          test
        </div>
      </motion.div>
      <div
        className="ml-3 flex justify-start items-start"
        style={{
          width: "5px",
          height: "30vw",
          borderRadius: "30px",
          backgroundColor: "#232323",
        }}
      >
        <motion.div
          className=" bg-primary-500 place-self-start"
          style={{
            scaleY: spring,
            borderRadius: "30px",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

const LookForwardScrollSM = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const lookForwardScrollRef = useRef<HTMLDivElement>(null);
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);
  const { scrollX, scrollXProgress } = useScroll({
    container: lookForwardScrollRef,
  });

  const updateCarouselItem = () => {
    switch (currentSection) {
      case 0: {
        setCurrentSection(1);
        return;
      }
      case 1: {
        setCurrentSection(2);
        return;
      }
      case 2: {
        setCurrentSection(0);
        return;
      }
    }
  };

  useEffect(() => {
    setInterval(updateCarouselItem, 2000);
  }, []);

  useMotionValueEvent(scrollX, "change", (latest) => {
    clearTimeout(timeoutId);
    const parentWidth = document.getElementById(
      "lookForwardScrollSM"
    ).offsetWidth;
    if (latest < parentWidth / 2) {
      const id = setTimeout(() => {
        setCurrentSection(0);
      }, 50);
      timeoutId = id;
      return;
    }

    if (latest < (parentWidth * 3) / 2) {
      const id = setTimeout(() => {
        setCurrentSection(1);
      }, 50);
      timeoutId = id;
      return;
    }

    const id = setTimeout(() => {
      setCurrentSection(2);
    }, 50);
    timeoutId = id;
  });

  return (
    <div className=" relative">
      <motion.div
        ref={lookForwardScrollRef}
        id="lookForwardScrollSM"
        className="flex flex-row overflow-scroll "
        style={{ width: "80vw", alignSelf: "center" }}
      >
        <motion.img
          ref={img1}
          src="/svg/scroll-content-1.svg"
          style={{
            width: "80vw",
            height: "auto",
            opacity: useTransform(scrollXProgress, [0, 0.5, 1], [1, 0.4, 0.4]),
          }}
        />
        <motion.img
          ref={img2}
          src="/svg/scroll-content-2.svg"
          style={{
            width: "80vw",
            height: "auto",
            opacity: useTransform(scrollXProgress, [0, 0.5, 1], [0.4, 1, 0.4]),
          }}
        />
        <motion.img
          ref={img3}
          src="/svg/scroll-content-3.svg"
          style={{
            width: "80vw",
            height: "auto",
            opacity: useTransform(scrollXProgress, [0, 0.5, 1], [0, 0.4, 1]),
          }}
        />
      </motion.div>
    </div>
  );
};
let lastCarouselIntervalId;
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const items = [
    "/svg/scroll-content-1.svg",
    "/svg/scroll-content-2.svg",
    "/svg/scroll-content-3.svg",
  ];
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",

      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const goToNextItem = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToPrevItem = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const goToIndex = (i: number) => {
    setDirection(currentIndex < i ? 1 : -1);
    setCurrentIndex(i);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === items.length) goToPrevItem();
      else {
        goToNextItem();
      }
    }, 3000);
    lastCarouselIntervalId = interval;
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative items-center"
      style={{
        width: "80vw",
        height: "100vw",
      }}
    >
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragStart={() => clearInterval(lastIntervalId)}
          onDragEnd={(e, { offset, velocity }) => {
            if (offset.x > 100 || velocity.x > 200) {
              goToNextItem();
            } else if (offset.x < -100 || velocity.x < -200) {
              goToPrevItem();
            }
          }}
        >
          <motion.img
            src={items[currentIndex]}
            className="absolute"
            style={{
              width: "80vw",
              height: "auto",
            }}
          />
        </motion.div>
      </AnimatePresence>
      <div className="flex flex-row w-full justify-center absolute bottom-0">
        <motion.div
          className="h-2 w-2 rounded-full mx-2 transition-all"
          style={{
            backgroundColor:
              currentIndex === 0 ? colors.primary : colors.primary50,
          }}
          onClick={() => {
            clearInterval(lastCarouselIntervalId);
            goToIndex(0);
          }}
        />
        <motion.div
          className="h-2 w-2 rounded-full mx-2 transition-all"
          style={{
            backgroundColor:
              currentIndex === 1 ? colors.primary : colors.primary50,
          }}
          onClick={() => {
            clearInterval(lastCarouselIntervalId);
            goToIndex(1);
          }}
        />
        <motion.div
          className="h-2 w-2 rounded-full mx-2 transition-all"
          style={{
            backgroundColor:
              currentIndex === 2 ? colors.primary : colors.primary50,
          }}
          onClick={() => {
            clearInterval(lastCarouselIntervalId);
            goToIndex(2);
          }}
        />
      </div>
    </div>
  );
};

export const Page4 = ({
  containerStyle,
  contentContainerStyle,
  spring,
}: {
  containerStyle: () => any;
  contentContainerStyle: () => any;
  spring: MotionValue<any>;
}) => {
  const refTop = useRef(null);
  const refTopRight = useRef(null);
  const refTopLeft = useRef(null);
  const refBottomRight = useRef(null);
  const refBottomLeft = useRef(null);

  const isInViewTop = useInView(refTop);
  const isInViewTopRight = useInView(refTopRight);
  const isInViewTopLeft = useInView(refTopLeft);
  const isInViewBottomRight = useInView(refBottomRight);
  const isInViewBottomLeft = useInView(refBottomLeft);
  return (
    <motion.div
      className="relative flex flex-col  z-40"
      id="landing_page4__container"
      style={containerStyle()}
    >
      <motion.div
        className="landing_page4__container z-40"
        style={contentContainerStyle()}
      >
        <motion.div
          transition={{ duration: 0.3 }}
          layout
          ref={refTop}
          animate={{
            scale: isInViewTop ? 1 : 0.95,
            opacity: isInViewTop ? 1 : 0.6,
          }}
          className="landing_page4__content-container-top grid grid-cols-1 md:grid-cols-2"
        >
          <div
            className="landing_page4__content-container-child-1-top "
            style={{ padding: "4vw" }}
          >
            <p className="landing_page__text-primary-header">AI MILO</p>
            <p className="landing_page__text-primary-title text-center">
              Meet Milo, your AI writing whiz!
            </p>
            <p className="landing_page__text-primary-description text-center">
              With a touch of magic, Milo crafts personalised emails from
              website and LinkedIn data, leading to 80% open rates and
              lightning-fast lead generation.
            </p>
          </div>

          <div className="landing_page4__content-container-child-2-top overflow-hidden">
            <img
              src="/svg/input-rectangle-group.svg"
              style={{
                borderBottomRightRadius: "31px",
                borderBottomLeftRadius: "31px",
                paddingTop: "12px",
              }}
            />
          </div>
        </motion.div>
        <motion.div className="landing_page4__container-default grid grid-cols-1 md:grid-cols-2">
          <motion.div
            transition={{ duration: 0.3 }}
            layout
            ref={refTopLeft}
            animate={{
              scale: isInViewTopLeft ? 1 : 0.95,
              opacity: isInViewTopLeft ? 1 : 0.6,
            }}
            className="landing_page4__content-container-default"
          >
            <img src="/svg/csv-upload.svg" className=" mb-6" />
            <p className="landing_page__text-primary-header mb-3">CSV UPLOAD</p>
            <p className="landing_page__text-primary-title mb-3">
              Upload your CSV file with ease
            </p>
            <p className="landing_page__text-primary-description">
              Milo turns a CSV file into an irresistible email! Witness the
              magic of data and creativity combined. Make sure to keep Milo fed.
            </p>
          </motion.div>
          <motion.div
            transition={{ duration: 0.3 }}
            layout
            ref={refTopRight}
            animate={{
              scale: isInViewTopRight ? 1 : 0.95,
              opacity: isInViewTopRight ? 1 : 0.6,
            }}
            className="landing_page4__content-container-default"
          >
            <img src="/svg/accessibility.svg" className=" mb-6" />
            <p className="landing_page__text-primary-header mb-3">
              ACCESSIBILITY
            </p>
            <p className="landing_page__text-primary-title mb-3">
              Accessible to all with easy login
            </p>
            <p className="landing_page__text-primary-description">
              Email, socials, and more! We're adding exciting new ways, so stay
              tuned for a fun-filled ride. Join us and login with a smile!
            </p>
          </motion.div>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2  ">
          <motion.div
            transition={{ duration: 0.3 }}
            layout
            ref={refBottomLeft}
            animate={{
              scale: isInViewBottomLeft ? 1 : 0.95,
              opacity: isInViewBottomLeft ? 1 : 0.6,
            }}
            className="justify-center m-[8vw] flex flex-col text-center md:m-0 md:text-left"
          >
            <p className="landing_page__text-primary-header mb-3">WORKFLOW</p>
            <p className="landing_page__text-primary-title mb-3">
              Things to look forward to 📆
            </p>
            <p className="landing_page__text-primary-description ">
              Exciting features coming soon! Stay tuned for our roadmap as we
              bring them to life. Get ready for a whole new level of innovation.
            </p>
          </motion.div>
          <motion.div
            transition={{ duration: 0.3 }}
            layout
            ref={refBottomRight}
            animate={{
              opacity: isInViewBottomRight ? 1 : 0.6,
              scale: isInViewBottomRight ? 1 : 0.95,
            }}
            className="hidden md:flex flex-col items-end flex-1"
          >
            <LookForwardScrollMD spring={spring} />
          </motion.div>
          <motion.div className="md:hidden">
            <Carousel />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Page4;
