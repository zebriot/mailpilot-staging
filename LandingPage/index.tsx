import React, {
  ClassAttributes,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import SimpleBar from "simplebar-react";
import {
  Header,
  HeaderAbsolute,
  HeaderAbsoluteDark,
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
} from "./partials";
import { useInView } from "react-intersection-observer";
import CustomCursor from "./partials/customCursor";
import { JoinBetaModal } from "./partials/joinBeta";
import Head from "next/head";

export const LandingPage = () => {
  // scroll container
  const scrollRef = useRef<HTMLDivElement>(null);
  const hiddenScrollRef = useRef<HTMLDivElement>(null);

  const [darkHeaderOpen, setDarkHeaderOpen] = useState(false);
  const [headerOpen, setHeaderOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fullHeight, setFullHeight] = useState(0);
  const [joinBetaModal, setJoinBetaModal] = useState(false);
  // page scrollable height based on content length
  const [pageHeight, setPageHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [lookForwardHeight, setLookForwardHeight] = useState(0);

  // update scrollable height when browser is resizing
  const resizePageHeight = useCallback((entries) => {
    const lookForwardScrollMD = document.getElementById(
      "look-forward-scroll-md"
    );
    setLookForwardHeight(lookForwardScrollMD.offsetHeight);
    for (let entry of entries) {
      setPageHeight(entry.contentRect.height);
    }
  }, []);
  const [footerHeight, setFooterHeight] = useState(0);

  const openJoinBetaModal = () => {
    setJoinBetaModal(true);
  };

  // observe when browser is resizing
  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      resizePageHeight(entries)
    );
    scrollRef && resizeObserver.observe(scrollRef.current);
    if (typeof window !== undefined) {
      setWindowHeight(window.innerHeight);
      setFooterHeight(
        document.getElementById("landing_page5__container").offsetHeight
      );
    }
    return () => resizeObserver.disconnect();
  }, [scrollRef, resizePageHeight]);

  const { scrollY } = useScroll(); // measures how many pixels user has scrolled vertically
  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Header", latest);
    // latest > 120 ? setOpen(true) : setOpen(false);
    const page1 = document.getElementById("landing_page1__container");
    const page2 = document.getElementById("landing_page2__container");
    const page3 = document.getElementById("landing_page3__container");
    const page4 = document.getElementById("landing_page4__container");
    const page5 = document.getElementById("landing_page5__container");

    console.log("latest", latest);

    if (latest < page1.offsetHeight) {
      setCurrentPage(1);
      setHeaderOpen(latest > 120);
      setDarkHeaderOpen(false);
      return;
    }
    if (latest < page1.offsetHeight + page2.offsetHeight + page3.offsetHeight) {
      setCurrentPage(2);
      setHeaderOpen(true);
      setDarkHeaderOpen(false);
      return;
    }
    if (
      latest <
      page1.offsetHeight +
        page2.offsetHeight +
        page3.offsetHeight +
        page4.offsetHeight -
        page5.offsetHeight +
        offsetLookForward
    ) {
      setCurrentPage(3);
      setHeaderOpen(true);
      setDarkHeaderOpen(false);
      return;
    }
    setHeaderOpen(false);
    setDarkHeaderOpen(true);
    setCurrentPage(4);
  });
  
  // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
  // ... based on current scroll position to translateY the document in a natural way
  const offsetLookForward = 2000; // 2 as the total scroll should be 3(total elements) minus 1
  const snapLookforwardStart = pageHeight - windowHeight - footerHeight; // Scrolly where the lookforward should start
  const snapLookforwardEnd =
    pageHeight + offsetLookForward - windowHeight - footerHeight; // Scrolly where the lookforward should end
  const transform = useTransform(
    scrollY,
    [
      0,
      snapLookforwardStart,
      snapLookforwardEnd,
      pageHeight + offsetLookForward,
    ],
    [0, -snapLookforwardStart, -snapLookforwardStart, -pageHeight]
  );
  const physics = { damping: 40, mass: 0.27, stiffness: 300 }; // easing of smooth scroll
  const spring = useSpring(transform, physics); // apply easing to the negative scroll value
  const transformPage5 = useTransform(
    scrollY,
    // pageHeight - windowHeight => TOTAL AVAILABLE SCROLL then  we minus the footerheight from it, that is when the footer is almost appearing
    [snapLookforwardEnd, pageHeight - windowHeight + offsetLookForward],
    [-footerHeight, 0]
  );
  const springPage5 = useSpring(transformPage5, physics);
  const transformLookForward = useTransform(
    scrollY,
    // pageHeight - windowHeight => TOTAL AVAILABLE SCROLL then  we minus the footerheight from it, that is when the footer is almost appearing
    [snapLookforwardStart, snapLookforwardEnd],
    [0, 1]
  );
  const springLookForward = useSpring(transformLookForward, physics);

  const scrollToPage = (page: number) => {
    const page1 = document.getElementById("landing_page1__container");
    const page2 = document.getElementById("landing_page2__container");
    const page3 = document.getElementById("landing_page3__container");
    const page4 = document.getElementById("landing_page4__container");

    let scrollTo = 0;

    if (page === 2) {
      scrollTo = page1.offsetHeight + page2.offsetHeight + 120;
    }

    if (page === 3) {
      scrollTo =
        page1.offsetHeight + page2.offsetHeight + page3.offsetHeight + 120;
    }

    if (page === 4) {
      scrollTo =
        page1.offsetHeight +
        page2.offsetHeight +
        page3.offsetHeight +
        page4.offsetHeight +
        offsetLookForward;
    }
    window.scrollTo({
      top: scrollTo,
      behavior: "smooth",
    });
  };


  return (
    <div className="relative flex flex-col items-center bg-neutral100 cursor-you">
      <Head>
        <title>Mail Pilot</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <motion.div
        ref={scrollRef}
        style={{ y: spring }} // translateY of scroll container using negative scroll value
        className="scroll-container z-30"
        id="main-landing-container"
      >
        <Header
          scrollToPage={scrollToPage}
          openJoinBetaModal={openJoinBetaModal}
        />
        <div className="landing_page__mesh_background z-30 relative">
          <Page1 scrollY={scrollY} openJoinBetaModal={openJoinBetaModal} />
          <Page2 />
          <Page3 />
        </div>

        <Page4
          containerStyle={function () {
            throw new Error("Function not implemented.");
          }}
          contentContainerStyle={function () {
            throw new Error("Function not implemented.");
          }}
          spring={springLookForward}
        />
        <motion.div
          style={{
            translateY: springPage5,
          }}
        >
          <Page5 />
        </motion.div>
      </motion.div>
      <HeaderAbsoluteDark
        visible={darkHeaderOpen}
        currentPage={currentPage}
        scrollToPage={scrollToPage}
        openJoinBetaModal={openJoinBetaModal}
      />
      <HeaderAbsolute
        visible={headerOpen}
        currentPage={currentPage}
        scrollToPage={scrollToPage}
        openJoinBetaModal={openJoinBetaModal}
      />
      <JoinBetaModal open={joinBetaModal} setOpen={setJoinBetaModal} />
      <div
        ref={hiddenScrollRef}
        style={{ height: pageHeight + offsetLookForward }}
      />
    </div>
  );
};

export default LandingPage;
