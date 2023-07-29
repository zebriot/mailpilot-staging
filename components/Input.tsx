import React, { forwardRef, useImperativeHandle } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { colors } from "../styles";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClass?: string;
  error?: string;
  labelClass?: string;
}

export interface InputRef {
  value: string;
  focus: () => void;
}

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {
    label,
    error,
    containerClass,
    className,
    labelClass,
    style,
    ...rest
  } = props;

  useImperativeHandle(ref, () => ({
    value: rest.value.toString() || "",
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return (
    <div className={"flex-1 flex flex-col pb-4 " + containerClass}>
      {label && (
        <p className={"text-[13px] text-black font-medium mb-[3px] " + labelClass}>
          {label}
        </p>
      )}
      <input
        ref={inputRef}
        className={`input-default ${error && "invalid"} mt-1 ` + className}
        style={{ height: "42px", zIndex: 2, ...style }}
        {...rest}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            style={{
              fontSize: "12px",
              color: colors.danger300,
              fontWeight: "600",
              zIndex: 1,
            }}
            initial={{ lineHeight: 0, opacity: 0, marginTop: 0 }}
            animate={{ lineHeight: "12px", opacity: 1, marginTop: "10px" }}
            exit={{ lineHeight: 0, opacity: 0, marginTop: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Input;
