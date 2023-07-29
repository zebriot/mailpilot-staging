import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef, useImperativeHandle, Ref } from "react";
import { colors } from "../styles";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
  label?: string;
  containerClass?: string;
  className?: string;
  error?:string
  labelClass?:string
}

interface TextAreaRef {
  value: string;
  focus: () => void;
}

const TextArea = forwardRef<TextAreaRef, TextAreaProps>(function TextArea(
  props,
  ref
) {
  const { label, labelClass,error,className, containerClass, rows = 2, ...rest } = props;
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    value: rest.value.toString() || "",
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return (
    <div className={"flex-1 flex flex-col " + containerClass}>
      {label && <p className={"text-sm text-black font-medium mb-1 "+labelClass}>{label}</p>}
      <textarea
        style={{ borderRadius: "15px", height: 34 * rows, resize: "none" }}
        ref={inputRef}
        className={`input-default ${error && 'invalid'} mt-1 resize-non ${error && 'invalid'}`+ className}
        {...rest}
        rows={rows}
      />
        <AnimatePresence>
        {error && (
          <motion.p
            style={{
              fontSize: "12px",
              color: colors.danger300,
              marginTop: "10px",
              fontWeight: "600",
            }}
            initial={{ lineHeight: 0, opacity: 0 }}
            animate={{ lineHeight: "12px", opacity: 1 }}
            exit={{ lineHeight: 0, opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

export default TextArea;
