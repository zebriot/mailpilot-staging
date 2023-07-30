import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo, useEffect } from "react";
import Button from "./button";
import { useAppSelector } from "../redux/store";
import { colors } from "../styles";
// import {
//   ArticleIcon,
//   CollapsIcon,
//   HomeIcon,
//   LogoIcon,
//   LogoutIcon,
//   UsersIcon,
//   VideosIcon,
// } from "./icons";

const SideTopbar = ({ children }) => {
  const currentStep = useAppSelector(
    (state) => state.state.homeState.currentStep
  );
  const user = useAppSelector((state) => state.state.user);
  console.log("USER IN SideTopbar", user);
  const menuItems = [
    {
      id: 1,
      label: "Home",
      link: `/home`,
      navigateTo: `/home?step=${currentStep}`,
      iconSrc: "/svg/home-smile.svg",
    },
    // {
    //   id: 4,
    //   label: "Link Account",
    //   link: "/accounts/link",
    //   iconSrc: "/svg/home-smile.svg",
    // },
    {
      id: 2,
      label: "Accounts",
      link: "/accounts",
      navigateTo: "/accounts",
      iconSrc: "/svg/mail.svg",
      // subRoutes: [
      //   {
      //     id: 21,
      //     label: "Linked Accounts",
      //     link: "/accounts",
      //   },
      //   {
      //     id: 22,
      //     label: "Personas",
      //     link: "/accounts",
      //   },
      // ],
    },
  ];
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => router.pathname.includes(menu.link)),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-full px-3 pt-6 pb-4 bg-light flex justify-between flex-col sidebar-content-container",
    {
      ["w-64"]: !toggleCollapse,
      ["w-[64px]"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames("p-3 rounded absolute right-0");

  const getNavItemClasses = (id) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter w-full overflow-hidden whitespace-nowrap menu sm:menu-collapsed",
      {
        ["active-menu"]: activeMenu?.id === id,
        ["menu-collapsed"]: !toggleCollapse,
      }
    );
  };

  const onMouseOver = () => {
    // setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        if (document.getElementById("search") !== document.activeElement) {
          e.preventDefault();
          console.log("Search is not in focus");
          document.getElementById("search").focus();
        } else {
          console.log("Default action of CtrlF");
          return true;
        }
      }
    });
  }, []);

  if (!activeMenu?.id)
    return (
      <div className="h-screen w-screen">{children}</div>
    );

  return (
    <div className="h-full w-screen flex-row flex flex-1" id="app-container">
      <div className="sidebar-container ">
        <div
          className={wrapperClasses}
          onMouseEnter={onMouseOver}
          onMouseLeave={onMouseOver}
          style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between relative ">
              <div
                className="flex items-center pl-1 h-14 transition-all duration-500"
                style={{
                  opacity: toggleCollapse ? 0 : 1,
                }}
              >
                <img
                  src="/svg/mail-pilot-logo.svg"
                  alt="Logo"
                  className="logo-default"
                />
              </div>

              <button
                className={collapseIconClasses}
                onClick={handleSidebarToggle}
              >
                {/* <CollapsIcon /> */}
                <img
                  src={
                    toggleCollapse
                      ? "/svg/close-drawer.svg"
                      : "/svg/open-drawer.svg"
                  }
                  className="h-4 w-4"
                />
              </button>
            </div>

            <div className="flex flex-col items-start mt-[76px]">
              {menuItems.map(({ iconSrc, ...menu }) => {
                const classes = getNavItemClasses(menu.id);
                return (
                  <>
                    <div
                      className={classes}
                      onClick={() => {
                        router.push(menu.navigateTo);
                        // !toggleCollapse && handleSidebarToggle();
                      }}
                    >
                      {/* <Link href={menu.link}> */}
                      <div className="flex py-3 px-[10px] items-center w-full h-[45px]">
                        <div style={{ width: "2rem" }}>
                          <img src={iconSrc} className="w-[19px] h-[19px]" />
                        </div>
                        <span
                          className={classNames(
                            "font-medium text-text-light transition-all"
                          )}
                          style={{
                            opacity: toggleCollapse ? 0 : 1,
                            fontSize: toggleCollapse ? 0 : "13px",
                          }}
                        >
                          {menu.label}
                        </span>
                      </div>
                      {/* </Link> */}
                    </div>
                    {/* <div>
                      {menu?.subRoutes &&
                        menu.subRoutes.map((i) => {
                          const classesSubRoutes = getNavItemClasses(i.id);
                          return (
                            <div
                              className={classesSubRoutes}
                              onClick={() => router.push(i.link)}
                            >
                              <div className="flex py-4 px-3 items-center w-full h-full ml-5">
                                {!toggleCollapse && (
                                  <span
                                    className={classNames(
                                      "text-md font-medium text-text-light"
                                    )}
                                  >
                                    {i.label}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div> */}
                  </>
                );
              })}
            </div>
          </div>
          <div
            style={{
              borderColor: colors.light100,
              borderTopWidth: "1px",
              padding: 0,
            }}
          >
            <div
              className={`flex flex-row items-center mt-4 transition-all duration-500 `}
            >
              <img
                src="/svg/help-circle.svg"
                className="h-[19px] w-[19px] mr-2"
              />
              {/* {!toggleCollapse && ( */}
              <p
                className={"transition-all duration-100"}
                style={{
                  color: colors.dark100,
                  textShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  fontSize: !toggleCollapse ? "12px" : 0,
                  opacity: !toggleCollapse ? 1 : 0,
                  fontFamily: "Inter",
                  fontWeight: "500",
                }}
              >
                Help & Getting started
              </p>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col sidetopbar-container ">
        <div className="sidetopbar-content-container ">
          <div
            className="sidebar_search-container"
            style={{
              backgroundColor: isSearchFocused ? colors.primary50 : "#F5F5F5",
              borderWidth: "1px",
              borderColor: isSearchFocused
                ? colors.primary
                : colors.transparent,
            }}
          >
            <img src="/svg/search.svg" className=" h-[19px] w-[19px" />
            <input
              id="search"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="sidebar_search-input"
              placeholder="Search or type a command"
              style={{
                backgroundColor: colors.transparent,
                fontStyle: "normal",
                fontSize: "13px",
                lineHeight: "16px",
                display: "flex",
                alignItems: "center",
                color: "#171821",
              }}
            />
            <div className="px-4 py-2 bg-white rounded-lg">
              <p
                style={{
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "15px",
                  lineHeight: "18px",
                  display: "flex",
                  alignItems: "center",
                  color: "#171821",
                }}
              >
                ⌘F
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center align-middle ">
            {/* Quick Create Button */}
            <Button
              title="Create"
              iconSrc="/svg/plus.svg"
              preset="primary"
              containerStyle={{ marginRight: "40px" }}
              onPress={() => router.push("/home")}
            />

            {/* User's Messages , use text-1 as src for unread*/}
            <img src="/svg/text-0.svg" className=" h-[22px] w-[22px] mr-8" />

            {/* User's Notification , use bell-1 as src for unread */}
            <img src="/svg/bell-0.svg" className=" h-[22px] w-[22px] mr-8" />

            {/* User's Organisation */}
            <div className="sidebar_org-container mr-3">
              {user?.company?.name.slice(0, 1) + user?.company?.name.slice(-1)}
            </div>
            <div
              className="flex flex-row items-center align-middle cursor-pointer"
              onClick={() => router.push("/accounts/settings")}
            >
              {/* User's Profile Image */}
              <img
                className="h-10 w-10 mr-3 "
                style={{ borderRadius: "20px" }}
                src={user?.photoUrl}
              />
              {/* User's name */}
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "15px",
                  lineHeight: "28px",
                  display: "flex",
                  alignItems: "center",
                  color: "#000000",
                }}
              >
                {user?.name}
              </p>
            </div>
          </div>
        </div>
        <div className="child-container">{children}</div>
      </div>
    </div>
  );
};

export default SideTopbar;
