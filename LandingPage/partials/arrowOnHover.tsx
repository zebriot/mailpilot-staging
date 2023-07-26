import React from "react";

export const ArrowOnHover = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex items-center arrow-on-hover-container"
      onClick={onClick}
    >
      <img src="/svg/arrow-right-black.svg" />
      <p>{label}</p>
    </div>
  );
};
