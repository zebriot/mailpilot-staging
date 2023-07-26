import {
  AnimatePresence,
  motion,
  useCycle,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Button from "../../components/button";
import Router from "next/router";
import { colors } from "../../styles";
import { useState } from "react";

const links = [
  { name: "About", to: "#", id: 1 },
  { name: "How To", to: "#", id: 2 },
  { name: "Features", to: "#", id: 3 },
];

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

export const Header = ({
  scrollToPage,
}: {
  scrollToPage: (p: number) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="landing_page__header_container z-50 px-5 md:px-12">
        <img src="/svg/mailpilot-sm.svg" className="flex h-8 w-8 md:hidden" />
        <img
          src="/svg/mail-pilot-logo.svg"
          alt="Logo"
          className="hidden logo-default md:flex"
        />
        <div className="hidden  flex-row md:flex">
          {data.map((i) => (
            <p
              onClick={() => scrollToPage(i.page)}
              className="landing_page__header_menu_text"
            >
              {i.label}
            </p>
          ))}
        </div>
        <div className="hidden md:flex flex-row md:visible">
          <Button
            title="Login"
            onPress={() => Router.push({ pathname: "/login" })}
            preset="secondary"
            containerStyle={{ marginRight: "16px" }}
            cursor={false}
          />
          <Button
            title="Join Beta"
            preset="primary"
            onPress={() => Router.push({ pathname: "/joinbeta" })}
            cursor={false}

          />
        </div>
        <img
          src="/svg/vertical-3-slices.svg"
          alt="More"
          className="flex h-6 w-6 md:hidden"
          style={{ zIndex: "60px" }}
          onClick={() => setOpen(true)}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: "100%", height: 0 }}
            animate={{
              width: "100%",
              borderRadius: "30px",
              height: "fit-content",
            }}
            exit={{
              width: "100%",
              height: 0,
              transition: { delay: 0.4, duration: 0.3 },
            }}
            className="w-full bg-neutral900 absolute z-50 md:hidden"
          >
            <motion.div
              className="flex flex-col px-5"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              <motion.div
                className="landing_page__header_container-mobile px-0 md:px-12"
                variants={itemVariants}
              >
                <img
                  src="/svg/mailpilot-sm-white.svg"
                  color={colors.neutral100}
                  className="flex h-8 w-8 md:hidden"
                ></img>
                <img
                  src="/svg/vertical-3-slices-white.svg"
                  alt="More"
                  color={colors.neutral100}
                  className="flex h-6 w-6 md:hidden"
                  style={{ zIndex: "60px" }}
                  onClick={() => setOpen(false)}
                />
              </motion.div>
              {links.map(({ name, to, id }) => (
                <motion.p
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => scrollToPage(id), 1000);
                  }}
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  variants={itemVariants}
                  style={{
                    color: colors.neutral100,
                    fontFamily: "Lexend",
                    fontSize: "20px",
                    fontWeight: 500,
                  }}
                >
                  {name}
                </motion.p>
              ))}
              <motion.div
                className="flex flex-row my-5"
                variants={itemVariants}
              >
                <input
                  className="flex grow mr-5 outline-none bg-neutral900 text-neutral100 placeholder:text-neutral100"
                  style={{ borderBottomWidth: "1px" }}
                  placeholder="Join Our Newsletter"
                />
                <div className="h-10 w-10 flex items-center justify-center bg-neutral100 rounded-full">
                  <img src="/svg/arrow-right-black.svg" className="h-6 w-6" />
                </div>
              </motion.div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

const data = [
  { label: "About Us", page: 1 },
  { label: "How To", page: 2 },
  { label: "Features", page: 3 },
  { label: "Subscribe", page: 4 },
];

const dataDark = [
  { label: "About Us", page: 1 },
  { label: "How To", page: 2 },
  { label: "Features", page: 3 },
  { label: "Subscribe", page: 4 },
  { label: "GetStarted", page: 5 },
];

const headerDarkAbsoluteVariants = {
  visible: {
    bottom: "20px",
  },
  hidden: {
    bottom: "-100px",
  },
};

const headerAbsoluteVariants = {
  visible: {
    top: "20px",
  },
  hidden: {
    top: "-100px",
  },
};

export const HeaderAbsoluteDark = ({
  visible,
  currentPage,
  scrollToPage,
}: {
  visible: boolean;
  currentPage: number;
  scrollToPage: (p: number) => void;
}) => {
  console.log("SELECTDED PAGE", currentPage);
  return (
    <motion.div
      layout
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={headerDarkAbsoluteVariants}
      className="hidden fixed flex-row header-blurred-bg md:flex"
      style={{
        borderRadius: "64px",
        borderColor: colors.light200,
        borderWidth: "1px",
        height: "60px",
        padding: "5px",
        zIndex: 999,
        bottom: "20px",
      }}
    >
      {dataDark.map((i) => (
        <div
          onClick={() => scrollToPage(i.page)}
          className="relative h-full flex items-center"
        >
          {currentPage === i.page && (
            <motion.div
              layoutId="selected-dark"
              style={{
                backgroundColor: colors.neutral900,
                height: "100%",
                width: "100%",
                position: "absolute",
                borderRadius: "64px",
                top: 0,
              }}
            ></motion.div>
          )}
          <p
            className="landing_page__header_menu_text z-50"
            style={{
              color:
                currentPage === i.page ? colors.neutral100 : colors.neutral900,
            }}
          >
            {i.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
};

export const HeaderAbsolute = ({
  visible,
  currentPage,
  scrollToPage,
}: {
  visible: boolean;
  currentPage: number;
  scrollToPage: (p: number) => void;
}) => {
  console.log("SELECTDED PAGE", currentPage);
  return (
    <motion.div
      layout
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={headerAbsoluteVariants}
      className="hidden  fixed flex-row header-blurred-bg md:flex"
      style={{
        borderRadius: "64px",
        borderColor: colors.light200,
        borderWidth: "1px",
        height: "60px",
        padding: "5px",
        zIndex: 999,
      }}
    >
      {data.map((i) => (
        <div
          className="relative h-full flex items-center"
          onClick={() => scrollToPage(i.page)}
        >
          {currentPage === i.page && (
            <motion.div
              layoutId="selected"
              style={{
                backgroundColor: colors.primary400,
                height: "100%",
                width: "100%",
                position: "absolute",
                borderRadius: "64px",
                top: 0,
              }}
            ></motion.div>
          )}
          <p
            className="landing_page__header_menu_text z-50"
            style={{
              color:
                currentPage === i.page ? colors.neutral100 : colors.neutral900,
            }}
          >
            {i.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
};
