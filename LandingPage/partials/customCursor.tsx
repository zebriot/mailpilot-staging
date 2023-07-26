import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  useEffect(() => {
    if (cursorRef.current == null || cursorRef == null) return;
    let lastMouseMovedPosition = { y: 0, x: 0 };

    document.addEventListener("mousemove", (e) => {
      if (cursorRef.current == null) return;
      lastMouseMovedPosition = { x: e.pageX, y: e.pageY - window.scrollY };
      cursorRef.current.setAttribute(
        "style",
        "top: " + e.pageY + "px; left: " + e.pageX + "px;"
      );
    });

    document.addEventListener("scroll", (e) => {
      if (cursorRef.current == null) return;
      console.log("window.scrollY", window.scrollY, lastMouseMovedPosition);
      cursorRef.current.setAttribute(
        "style",
        `top:${(window.scrollY + lastMouseMovedPosition.y)}px; left:${lastMouseMovedPosition.x}px;`
      );
    });

    document.addEventListener("click", () => {
      if (cursorRef.current == null) return;
      cursorRef.current.classList.add("expand");
      setTimeout(() => {
        if (cursorRef.current == null) return;
        cursorRef.current.classList.remove("expand");
      }, 500);
    });
  }, []);
  return <motion.div className="cursor" ref={cursorRef}>
    <img src="/png/cursor-you-2.png"/>
  </motion.div>;
}
