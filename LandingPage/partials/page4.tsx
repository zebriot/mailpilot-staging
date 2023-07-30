import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/button";
import Page5 from "./page5";
import {
  AnimatePresence,
  AnimateSharedLayout,
  MotionValue,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { colors } from "../../styles";
import { wrap } from "@popmotion/popcorn";

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

let lastCarouselIntervalId;
const xOffset = 100;
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? xOffset : -xOffset,
    opacity: 0,
  }),
  active: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.2 },
  },
  exit: (direction) => ({
    x: direction > 0 ? -xOffset : xOffset,
    opacity: 0,
  }),
};
const pages = [
  { page: 0, src: "/svg/scroll-content-1.svg" },
  { page: 1, src: "/svg/scroll-content-2.svg" },
  { page: 2, src: "/svg/scroll-content-3.svg" },
];

const PageSlider = ({ currentPage, setPage, direction }) => {
  /* Add and remove pages from the array to checkout
     how the gestures and pagination animations are
     fully data and layout-driven. */
  const hasPaginated = useRef(false);

  function detectPaginationGesture(e, { offset }) {
    if (hasPaginated.current) return;
    let newPage = currentPage;
    const threshold = xOffset / 2;

    if (offset.x < -threshold) {
      // If user is dragging left, go forward a page
      newPage = currentPage + 1;
    } else if (offset.x > threshold) {
      // Else if the user is dragging right,
      // go backwards a page
      newPage = currentPage - 1;
    }

    if (newPage !== currentPage) {
      hasPaginated.current = true;
      // Wrap the page index to within the
      // permitted page range
      newPage = wrap(0, pages.length, newPage);
      setPage(newPage, offset.x < 0 ? 1 : -1);
    }
  }

  return (
    <div
      className="relative"
      style={{
        height: "100vw",
      }}
    >
      <AnimatePresence
        // This will be used for components to resolve
        // exit variants. It's necessary as removed
        // components won't rerender with
        // the latest state (as they've been removed)
        custom={direction}
      >
        <motion.div
          key={currentPage}
          className="slide"
          data-page={currentPage}
          variants={variants}
          initial="enter"
          animate="active"
          exit="exit"
          drag="x"
          onDrag={detectPaginationGesture}
          onDragStart={() => (hasPaginated.current = false)}
          onDragEnd={() => (hasPaginated.current = true)}
          // Snap the component back to the center
          // if it hasn't paginated
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          // This will be used for components to resolve all
          // other variants, in this case initial and animate.
          custom={direction}
        >
          <img
            src={pages[currentPage].src}
            style={{
              width: "80vw",
              height: "auto",
            }}
            className="absolute"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
const Pagination = ({ currentPage, setPage }) => {
  // Wrap all the pagination Indicators
  // with AnimateSharedPresence
  // so we can detect when Indicators
  // with a layoutId are removed/added
  return (
    <div className="flex flex-row justify-center">
      {pages.map(({ page }) => (
        <Indicator
          key={page}
          onClick={() => setPage(page)}
          isSelected={page === currentPage}
        />
      ))}
    </div>
  );
};

const Indicator = ({ isSelected, onClick }) => {
  return (
    <div className=" bg-light-300 h-2 w-2 rounded-full mx-2" onClick={onClick}>
      {isSelected && (
        <motion.div
          className="bg-primary h-2 w-2 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  );
};
const Carousel = () => {
  /* animations depending on the direction of travel */
  const [[currentPage, direction], setCurrentPage] = useState([0, 0]);

  function setPage(newPage, newDirection) {
    if (!newDirection) newDirection = newPage - currentPage;
    setCurrentPage([newPage, newDirection]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPage === pages.length - 1) setCurrentPage([0, 0]);
      else {
        setCurrentPage((prevIndex) => [(prevIndex[0] + 1) % pages.length, 1]);
      }
    }, 3000);
    return () => clearInterval(interval);
  });
  return (
    <>
      <PageSlider
        currentPage={currentPage}
        direction={direction}
        setPage={setPage}
      />
      <Pagination currentPage={currentPage} setPage={setPage} />
    </>
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
