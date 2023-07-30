import React, {
  UIEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import Head from "next/head";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { current } from "@reduxjs/toolkit";
import { colors } from "../styles";
import CustomCursor from "./partials/customCursor";
import { JoinBetaModal } from "./partials/joinBeta";

export const LandingPage = () => {
  const { scrollY, scrollYProgress } = useScroll();

  const scrollRef = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [darkHeaderOpen, setDarkHeaderOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [footerHeight, setFooterHeight] = useState(0);
  const [fullHeight, setFullHeight] = useState(0);
  const [joinBetaModal, setJoinBetaModal] = useState(false);

  console.log("footerHeight", footerHeight);

  useEffect(() => {
    if (typeof window !== undefined) {
      setFooterHeight(
        document.getElementById("landing_page5__container").offsetHeight
      );
      setFullHeight(
        document.getElementById("main-landing-content").offsetHeight +
          window.innerHeight
      );
    }
  });

  const openJoinBetaModal = () => {
    setJoinBetaModal(true);
  };

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
        page4.offsetHeight;
    }
    window.scrollTo({
      top: scrollTo,
      behavior: "smooth",
    });
  };
  const [scrollPosition, setScrollPosition] = useState(0);
  // const handleScroll = (e) => {
  //   setScrollPosition();
  // };
  // useEffect(() => {
  //   // Attach the scroll event listener when the component mounts
  //   window.addEventListener("scroll", (e) => handleScroll(e));

  //   // Clean up the scroll event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
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
      setOpen(latest > 120);
      setDarkHeaderOpen(false);
      return;
    }
    if (latest < page1.offsetHeight + page2.offsetHeight + page3.offsetHeight) {
      setCurrentPage(2);
      setOpen(true);
      setDarkHeaderOpen(false);
      return;
    }
    if (
      latest <
      page1.offsetHeight +
        page2.offsetHeight +
        page3.offsetHeight +
        page4.offsetHeight -
        page5.offsetHeight
    ) {
      setCurrentPage(3);
      setOpen(true);
      setDarkHeaderOpen(false);
      return;
    }
    setOpen(false);
    setDarkHeaderOpen(true);
    setCurrentPage(4);
  });

  const page4AnimatedContainer = () => {
    if (typeof window === "object") {
      const page5 = document.getElementById("landing_page5__container");
      const mainScroll = document.getElementById("main-landing-content");
      console.log(
        "mainScroll.scrollHeight",
        mainScroll.scrollHeight - window.innerHeight
      );
      return {
        borderRadius: useTransform(
          scrollY,
          [
            mainScroll.scrollHeight - window.innerHeight - page5.offsetHeight,
            mainScroll.scrollHeight - window.innerHeight,
          ],
          [0, 100]
        ),
        scale: useTransform(
          scrollY,
          [
            0,
            mainScroll.scrollHeight - window.innerHeight - page5.offsetHeight,
            mainScroll.scrollHeight - window.innerHeight,
          ],
          [1, 1, 0.95]
        ),
      };
    }
  };
  const page4AnimatedContentContainer = () => {
    if (typeof window === "object") {
      const page5 = document.getElementById("landing_page5__container");
      const mainScroll = document.getElementById("main-landing-container");
      console.log(
        "mainScroll.scrollHeight",
        mainScroll.scrollHeight - window.innerHeight
      );
      return {
        borderRadius: useTransform(
          scrollY,
          [
            mainScroll.scrollHeight - window.innerHeight - page5.offsetHeight,
            mainScroll.scrollHeight - window.innerHeight,
          ],
          [0, 100]
        ),
      };
    }
  };

  useEffect(() => {
    let parentPrevented = false;

    // document.addEventListener("DOMContentLoaded", function () {
    var parentComponent = document.getElementById("main-landing-content");

    var lookforwardScroll = document.getElementById("lookForwardScrollMD");
    const page5 = document.getElementById("landing_page5__container");

    // return {
    //   borderRadius: useTransform(
    //     scrollY,
    //     [
    //       mainScroll.scrollHeight - window.innerHeight - page5.offsetHeight,
    //       mainScroll.scrollHeight - window.innerHeight,
    //     ],
    //     [0, 100]
    //   ),
    // };
    // if (!lookforwardScroll) return
    parentComponent.addEventListener("wheel", function (e: WheelEvent) {
      console.log("parentPrevented", parentPrevented);
      // e.preventDefault();
    });
    let timeoutId;
    window.addEventListener("scroll", function (e: WheelEvent) {
      // parentComponent.animate({scrollTop :parentComponent.scrollTop += e.deltaY / 5 }, "fast")
      // setTimeout(() => parentComponent.scrollTo({
      //   top: (parentComponent.scrollTop += e.deltaY),
      //   behavior: "smooth",
      // });)
      setScrollPosition(this.scrollY);
      // parentComponent.scrollTop += e.deltaY / 5;
      // Check if the scroll position is at the top or bottom
      var bottom = parentComponent.scrollHeight - window.innerHeight;
      // if (
      //   parentComponent.scrollTop === bottom - page5.offsetHeight &&
      //   // is lookforward scroll at not fully scrolled
      //   e.deltaY > 0 &&
      //   lookforwardScroll.scrollTop > 0 &&
      //   lookforwardScroll.scrollTop > 0 &&
      //   lookforwardScroll.scrollTop <
      //     lookforwardScroll.scrollHeight - lookforwardScroll.offsetHeight
      // ) {
      //   e.preventDefault();
      //   lookforwardScroll.scrollTop += e.deltaY;
      // }
      // Calculate the direction and amount of scrolling
      // var delta = e.deltaY;
      console.log("e.deltaY ", e.deltaY);
      console.log("bottom ", bottom - page5.offsetHeight, "===", this.scrollY);
      // if (true) {
      //   // Prevent scrolling by setting overflow to hidden
      //   document.body.style.overflow = "hidden";
      // } else {
      //   // Allow scrolling by setting overflow to its default value
      //   document.body.style.overflow = "auto";
      // }
      console.log("SCROLL TOPPP  ", this.scrollY);

      // if (
      //   this.scrollY <= bottom - page5.offsetHeight + 100 &&
      //   this.scrollY >= bottom - page5.offsetHeight - 100
      // ) {
      //   // lookforwardScroll.scrollTop += e.deltaY;
      //   document.body.style.overflow = "hidden";
      // } else {
      //   document.body.style.overflow = "auto";
      // }
    });
    // });
  }, []);

  function handleTransparentDivAbovePage5Scroll(event) {
    // Add your scroll event handling logic here
    console.log("Transparent div scrolled!", JSON.stringify(event));
  }

  return (
    <>
      <Head>
        <title>Mail Pilot</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="h-full flex flex-1 realtive bg-primary-500 relative ">
        <div
          id="mock-scroll-container"
          style={{ height: "400vh", backgroundColor: "red" }}
        ></div>

        <motion.div
          className=" flex flex-col items-center bg-neutral100 cursor-none  fixed bottom-0"
          id="main-landing-container"
          style={{
            // Use the scroll position to adjust the vertical position of the motion.div
            translateY: -scrollPosition,
            // Additional styles for demonstration purposes
            width: "100%",
            height: "100vh", // Set height to create enough scroll space
            background: "lightblue",
          }}
        >
          <div
            className="flex flex-1 flex-col z-30 bg-danger50 "
            id="main-landing-content"
          >
            <div className=" top-0 z-30 flex flex-1 flex-col">
              <Header
                scrollToPage={scrollToPage}
                openJoinBetaModal={openJoinBetaModal}
              />
              <div
                className="landing_page__mesh_background z-30 "
                id="top-test"
              >
                <Page1
                  scrollY={scrollY}
                  openJoinBetaModal={openJoinBetaModal}
                />
                <Page2 />
                <Page3 />
              </div>
              <Page4
                containerStyle={page4AnimatedContainer}
                contentContainerStyle={page4AnimatedContentContainer}
              />
              <div
                id="transparent-div-above-page5"
                style={{
                  height: `${footerHeight}px`,
                  width: "100%",
                  // zIndex: 10,
                  pointerEvents: "none",
                  // backgroundColor: colors.transparent,
                }}
                // onScroll={handleTransparentDivAbovePage5Scroll}
              ></div>
              <CustomCursor />
              <HeaderAbsoluteDark
                visible={darkHeaderOpen}
                currentPage={currentPage}
                scrollToPage={scrollToPage}
                openJoinBetaModal={openJoinBetaModal}
              />
              <HeaderAbsolute
                visible={open}
                currentPage={currentPage}
                scrollToPage={scrollToPage}
                openJoinBetaModal={openJoinBetaModal}
              />
              <JoinBetaModal open={joinBetaModal} setOpen={setJoinBetaModal} />
            </div>
            <Page5 />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LandingPage;
