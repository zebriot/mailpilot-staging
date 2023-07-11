import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Button from "../../../button";
import { colors } from "../../../../styles";
import Input from "../../../Input";
import TextArea from "../../../TextArea";

export const EditProfileModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
}) => {
  const save = () => {
    setOpen(false);
  };
  return (
    <ReactModal isOpen={open} className="z-20">
      <AnimatePresence>
        {open && (
          <motion.div
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home_select-email-modal-container z-20"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            style={{ zIndex: 99999 }}
          >
            <div
              className="home_select-emial-modal-content-container relative z-30 p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-row justify-between">
                <p className="h3">Edit your MailPilot profile</p>
                <Button title="Save" preset="secondary" onPress={save} />
              </div>
              <p className="h5 mt-5 mb-3">Basic Information</p>
              <div
                style={{
                  paddingLeft: "20px",
                  paddingBlock: "10px",
                  borderLeftWidth: "1px",
                  borderColor: colors.light300,
                }}
              >
                <p className="body-text-xl">Profile Photo</p>
                <div
                  style={{
                    height: "122px",
                    width: "122px",
                    borderRadius: "20px",
                    background: colors.light200,
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                ></div>
                <div className="flex flex-row gap-5">
                  <Input
                    labelClass="body-text-xl"
                    label="Full name"
                    placeholder="milo@mailpilot.ai"
                    style={{ width: "380px" }}
                  />
                  <Input
                    labelClass="body-text-xl"
                    label="Job Title"
                    placeholder="Writer"
                    style={{ width: "380px" }}
                  />
                </div>
                <Input
                  labelClass="body-text-xl"
                  label="Company name"
                  placeholder="Writer"
                />
                <TextArea
                labelClass="body-text-xl"
                  placeholder="Eg: A creative branding and development agency with a focus on web3 and AI..."
                  label="What does your company do?"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReactModal>
  );
};
