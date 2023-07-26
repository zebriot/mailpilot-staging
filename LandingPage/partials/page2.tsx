import React from "react";
import Button from "../../components/button";

const data = [
  "Web Design",
  "GFX Design",
  "Motion Graphics",
  "Brand Identity",
  "Illustration",
  "UI/UX",
  "Mobile Dev",
  "Web Dev",
];

const Item = ({ item }: { item: string }) => {
  return (
    <div className="landing_page2__item-container">
      <img src="/svg/star.svg" className="landing_page2__item-icon" />
      <p className="landing_page2__item-text-container">{item}</p>
    </div>
  );
};

export const Page2 = () => {
  return (
    <div
      className="landing_page2__content-container z-30 "
      id="landing_page2__container"
    >
      <p className="landing_page2_heading" style={{ flexWrap: "wrap" }}>
        Partnered & backed by Sight3
      </p>
      <p className="landing_page2_sub-heading" style={{ flexWrap: "wrap" }}>
        A creative agency tailored at scaling AI & Web3 startups
      </p>
      <div style={{ maxWidth: "1000px" }}>
        <div className="landing_page2__items-container">
          {data.map((i) => (
            <Item item={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page2;
