import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { current } from "@reduxjs/toolkit";
import { colors } from "../styles";
import CustomCursor from "./partials/customCursor";

export const LandingPage = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const scrollRef = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [darkHeaderOpen, setDarkHeaderOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [footerHeight, setFooterHeight] = useState(0);
  const [fullHeight, setFullHeight] = useState(0);
  console.log("footerHeight", footerHeight);

  useEffect(() => {
    if (typeof window !== undefined) {
      setFooterHeight(
        document.getElementById("landing_page5__container").offsetHeight
      );
      setFullHeight(
        document.getElementById("main-landing-content").offsetHeight
      );
    }
  });

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
      };
    }
  };

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
      <div className="h-full w-full flex flex-col items-center bg-neutral100 cursor-none" id="main-landing-container">
        <div
          ref={scrollRef}
          className=" flex flex-1 flex-col z-30 bg-neutral100"
          id="main-landing-content"
        >
          <Header scrollToPage={scrollToPage} />
          <div className="landing_page__mesh_background z-30">
            <Page1 scrollY={scrollY} />
            <Page2 />
            <Page3 />
          </div>
          <Page4
            containerStyle={page4AnimatedContainer}
            contentContainerStyle={page4AnimatedContentContainer}
          />
          <div
            style={{
              height: `${footerHeight}px`,
              width: "100%",
            }}
          ></div>
          <Page5 />
        </div>
        <HeaderAbsoluteDark
          visible={darkHeaderOpen}
          currentPage={currentPage}
          scrollToPage={scrollToPage}
        />
        <HeaderAbsolute
          visible={open}
          currentPage={currentPage}
          scrollToPage={scrollToPage}
        />
      </div>
      <CustomCursor />
    </>
  );
};

export default LandingPage;
