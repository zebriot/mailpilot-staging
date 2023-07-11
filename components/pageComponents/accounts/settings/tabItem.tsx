import React from "react";

export const TabItem = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer accounts_settings__tag-input-container ${
        isActive && "active"
      }`}
    >
      <p
        className={`cursor-pointer accounts_settings__tag-input-text ${
          isActive && "active"
        }`}
      >
        {label}
      </p>
    </div>
  );
};
