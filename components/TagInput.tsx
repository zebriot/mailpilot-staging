import React, { forwardRef, useImperativeHandle } from "react";
import { InputProps, InputRef } from "./Input";
import { colors } from "../styles";
import { AnimatePresence, motion } from "framer-motion";

interface TagInputProps extends InputProps {
  tags: string[];
  error?:string,
  setTags: (a: string[]) => void;
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
      if (e.key === "Enter") {
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
        className={`input-default ${error && 'invalid'} mt-1` + className}
        style={{ height: "52px", ...style }}
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
      </AnimatePresence>
      <div className="flex-row flex overflow-scroll">
        {tags.map((i) => (
          <div className="flex flex-row tag-wrapper">
            <p style={{ color: colors.primary, marginRight: 5 }}>{i}</p>
            <button className="cursor-pointer" onClick={() => deleteTag(i)}>
              <img src="/svg/x.svg" className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
});

export default TagInput;
