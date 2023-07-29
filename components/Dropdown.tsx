import React, { forwardRef, useImperativeHandle } from "react";
import { colors } from "../styles";
import Select from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

export const DropDown = forwardRef<any, StateManagerProps>((props, ref) => {
  const { styles, ...rest } = props;

  return (
    <Select
      ref={ref}
      unstyled
      menuPortalTarget={typeof window !== "undefined" && document.body}
      menuPosition={"fixed"}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? colors.primary : "red",
        }),
        container: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? colors.primary : colors.light200,
          borderWidth: "1px",
          borderRadius: "12px",
          backgroundColor: colors.neutral100,
          height: 14 + 11 + 10,
          paddingInline: 20,
          alignItems: "center",
          display: "flex",
        }),
        valueContainer: (baseStyles, _state) => ({
          ...baseStyles,
          height: 26,
        }),
        menuPortal: (base, _props) => ({
          ...base,
          position: "absolute",
          // offset: 10,
        }),
        menuList: (base, _props) => ({
          ...base,
          width: "232px",
        }),
        option: (base, _props) => ({
          ...base,
          backgroundColor: colors.neutral100,
          borderBottomWidth: "0.5px",
          borderRightWidth: "0.5px",

          borderLeftWidth: "0.5px",
          bordeColor: colors.light200,
          paddingInline: "10px",
          paddingBlock: "5px",
          width: "232px",
        }),
        ...styles,
      }}
      classNamePrefix="home_custom-select"
      {...rest}
    />
  );
});

export default DropDown;
