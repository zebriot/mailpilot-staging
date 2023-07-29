import React, { forwardRef, useImperativeHandle } from "react";
import { InputProps, InputRef } from "./Input";
import { colors } from "../styles";
import { AnimatePresence, motion } from "framer-motion";

interface TagInputProps extends InputProps {
  tags: string[];
  error?: string;
  setTags: (a: string[]) => void;
  maxTagLength?: number;
}

const TagInput = forwardRef<InputRef, TagInputProps>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {
    label,
    tags,
    setTags,
    containerClass,
    className,
    onKeyDown,
    style,
    error,
    maxTagLength = 5,
    ...rest
  } = props;

  const deleteTag = (tag: string) => {
    setTags(tags.filter((i) => i !== tag));
  };

  useImperativeHandle(ref, () => ({
    value: rest.value.toString() || "",
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputRef.current.value) {
      if (e.key === "Enter" && tags.length < maxTagLength) {
        setTags([...tags, inputRef.current.value]);
        inputRef.current.value = "";
      }
      onKeyDown && onKeyDown(e);
    }
  };

  return (
    <div className={"flex-1 flex flex-col " + containerClass}>
      {label && <p className="text-sm text-black font-medium mb-1">{label}</p>}
      <input
        ref={inputRef}
        className={`input-default ${error && "invalid"} mt-1` + className}
        style={{ height: "42px", ...style }}
        onKeyDown={handleInputKeyDown}
        {...rest}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            style={{
              fontSize: "12px",
              color: colors.danger300,
              fontWeight: "600",
            }}
            initial={{ lineHeight: 0, opacity: 0, marginTop: 0 }}
            animate={{ lineHeight: "12px", opacity: 1, marginTop: "10px" }}
            exit={{ lineHeight: 0, opacity: 0, marginTop: 0 }}
          >
            {error}
          </motion.p>
        )}
        <div
          className="flex-row flex flex-wrap mb-3"
        >
          {tags.map((i) => (
            <motion.div
              transition={{ duration: 0.1 }}
              className="flex flex-row tag-wrapper"
              initial={{ height: 0, marginTop: 0, opacity: 0.5 }}
              animate={{ height: "32px", marginTop: "8px", opacity: 1 }}
              exit={{ height: 0, marginTop: 0, opacity: 0.5 }}
            >
              <motion.p
                initial={{
                  scaleY: 0,
                }}
                animate={{
                  color: colors.primary,
                  marginRight: "5px",
                  fontWeight: 500,
                  fontSize: "13px",
                  scaleY: 1,
                }}
                exit={{
                  scaleY: 0,
                }}
              >
                {i}
              </motion.p>
              <button
                className="cursor-pointer min-w-fit"
                onClick={() => deleteTag(i)}
              >
                <img src="/svg/x.svg" className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
});

export default TagInput;
