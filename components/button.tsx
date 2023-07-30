import React from "react";

type ButtonPresets = "primary" | "secondary" | "delete" | "delete-outline";

export interface ButtonProps {
  preset: ButtonPresets;
  iconSrc?: string;
  title: string;
  containerStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  iconPosition?: "left" | "right";
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  cursor?: boolean;
}

const getStylesForVariant = (
  preset: ButtonPresets,
  disabled: boolean,
  cursor: boolean
) => {
  switch (preset) {
    case "primary":
      return {
        container: `button-container-primary ${disabled && "disabled"} ${
          cursor && "hover:cursor-pointer"
        }`,
        icon: "button-icon-primary",
        title: "button-text-primary",
      };
    case "secondary":
      return {
        container: `button-container-secondary ${disabled && "disabled"} ${
          cursor && "hover:cursor-pointer"
        }`,
        icon: "button-icon-secondary",
        title: "button-text-secondary",
      };
    case "delete":
      return {
        container: `button-container-delete ${disabled && "disabled"} ${
          cursor && "hover:cursor-pointer"
        }`,
        icon: "button-icon-delete",
        title: "button-text-delete",
      };
    case "delete-outline":
      return {
        container: `button-container-delete-outline ${disabled && "disabled"} ${
          cursor && "hover:cursor-pointer"
        }`,
        icon: "button-icon-delete-outline",
        title: "button-text-delete-outline",
      };
  }
};

export const Button = ({
  title,
  preset,
  iconSrc,
  containerStyle,
  iconStyle,
  titleStyle,
  iconPosition = "left",
  onPress,
  loading = false,
  disabled = false,
  cursor = true,
}: ButtonProps) => {
  const classes = getStylesForVariant(preset, disabled, cursor);

  return (
    <div
      onClick={() => {
        if (disabled || loading) {
          return;
        } else {
          onPress && onPress();
        }
      }}
      className={classes.container}
      style={containerStyle}
    >
      {loading ? (
        <div
          className={
            preset === "delete" ? "loading-spinner-red" : "loading-spinner"
          }
        >
          {/* <div className="loading-center-dot"/> */}
        </div>
      ) : (
        <>
          {iconSrc && iconPosition === "left" && (
            <img
              className={classes.icon}
              src={iconSrc}
              style={{
                color: "#FFF",
                marginRight: "5px",
                height: "19px",
                width: "19px",
                resize: "both",
                ...iconStyle,
              }}
              color={"#FFF"}
            />
          )}
          <p className={classes.title} style={titleStyle}>
            {title}
          </p>
          {iconSrc && iconPosition === "right" && (
            <img
              className={classes.icon}
              src={iconSrc}
              style={{
                color: "#FFF",
                marginLeft: "5px",
                height: "19px",
                width: "19px",
                resize: "both",
                ...iconStyle,
              }}
              color={"#FFF"}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Button;
