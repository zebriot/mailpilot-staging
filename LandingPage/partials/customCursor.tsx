import { motion, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

export default function CustomCursor({spring}) {
  const cursorRef = useRef(null);
  useEffect(() => {
    if (cursorRef.current == null || cursorRef == null) return;

    const mainLandingContent = document.getElementById("main-landing-container");
    mainLandingContent.addEventListener("mousemove", (e) => {
      if (cursorRef.current == null) return;
      // lastMouseMovedPosition = { x: e.pageX, y: e.pageY - window.scrollY };
      cursorRef.current.setAttribute(
        "style",
        "top: " + e.offsetY + "px; left: " + e.pageX + "px;"
      );
    });

    mainLandingContent.addEventListener("click", () => {
      if (cursorRef.current == null) return;
      cursorRef.current.classList.add("expand");
      setTimeout(() => {
        if (cursorRef.current == null) return;
        cursorRef.current.classList.remove("expand");
      }, 200);
    });
  }, []);

  return (
    <motion.div className="cursor fixed" ref={cursorRef}        style={{ y: spring }} >
      <img src="/png/cursor-you-2.png" />
    </motion.div>
  );
}
