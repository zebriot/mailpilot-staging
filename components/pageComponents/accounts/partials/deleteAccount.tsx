import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useAppSelector } from "../../../../redux/store";
import { LinkedEmailAccount } from "../../../../utils";
import { colors } from "../../../../styles";
import Button from "../../../button";

export const DeleteAccountModal = ({
  account,
  open,
  setOpen,
}: {
  account: LinkedEmailAccount;
  setOpen: (b: boolean) => void;
  open: boolean;
}) => {
  const photoUrl = useAppSelector((s) => s.state.user.photoUrl);
  const [continueLoading, setContinueLoading] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(false);

  const onContinue = async () => {
    setContinueLoading(true);
    setContinueLoading(false);
  };

  return (
    <ReactModal portalClassName="z-50" isOpen={open} className=" z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="home_select-email-modal-container absolute"
            style={{ zIndex: 99 }}
          >
            <div
              className="home_select-emial-modal-content-container"
              onClick={(e) => e.stopPropagation()}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: colors.light300,
                  marginBottom: "10px",
                }}
              >
                Are you sure you want to remove the below account ?
              </p>
              <div
                className="flex flex-row items-center justify-between"
                style={{ width: "100%" }}
              >
                <div className="flex flex-row items-center my-2">
                  <img
                    src={photoUrl}
                    alt={account?.emailAddress}
                    className=" h-10 w-10"
                    style={{
                      borderRadius: "20px",
                      marginRight: "15px",
                    }}
                  />

                  <div className="flex-col flex">
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      {account?.name}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: colors.light300,
                      }}
                    >
                      {account.emailAddress}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row mt-5">
                <Button
                  title="Back"
                  preset="secondary"
                  containerStyle={{ flex: 1, marginRight: "5px" }}
                  onPress={() => {
                    setOpen(false);
                  }}
                />
                <Button
                  title={"DELETE"}
                  preset={"delete"}
                  containerStyle={{ flex: 1, marginLeft: "5px" }}
                  onPress={onContinue}
                  loading={continueLoading}
                  disabled={continueDisabled}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReactModal>
  );
};
