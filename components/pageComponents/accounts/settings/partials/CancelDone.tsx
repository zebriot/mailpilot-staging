import React, { ColgroupHTMLAttributes } from "react";
import { colors } from "../../../../../styles";

export const CancelDone = ({
  onCancelPress,
  onRightPress,
  rightDisabled,
  rightText = "Done",
  rightColor = colors.primary,
  leftColor = colors.danger400,
}: {
  onCancelPress: () => void;
  onRightPress: () => void;
  rightDisabled: boolean;
  rightText?: string;
  leftColor?: string;
  rightColor?: string;
}) => {
  return (
    <div className="flex flex-row w-full items-center">
      <div
        className="flex flex-row flex-1 justify-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onCancelPress();
        }}
      >
        <p className="body-text-l " style={{ color: leftColor }}>
          Cancel
        </p>
      </div>
      <img src="/svg/vertical-line.svg" className="w-1 h-7 mx-4 " />
      <div
        className="flex flex-row flex-1 justify-center cursor-pointer "
        onClick={onRightPress}
      >
        <p
          className="body-text-l transition-all duration-500"
          style={{
            color: rightDisabled ? colors.light200 : rightColor,
          }}
        >
          {rightText}
        </p>
      </div>
    </div>
  );
};
