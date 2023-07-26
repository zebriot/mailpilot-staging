import React, { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  EmailProvider,
  setAddEmailProcessType,
} from "../../redux/slices/steps";
import { LinkedEmailAccount, getUser, syncUser } from "../../utils";
import { useLoader } from "../../utils/providers";
import { useToasts } from "react-toast-notifications";
import { useToast } from "../../utils/toastProvider";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { EditAccountModal } from "../../components/pageComponents/accounts/partials/editAccount";
import { DeleteAccountModal } from "../../components/pageComponents/accounts/partials/deleteAccount";

const LinkedAccounts = () => {
  const { addToast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { startLoader, stopLoader } = useLoader();
  const [selectedAccount, setSelectedAccount] = useState<LinkedEmailAccount>();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const linkedEmails = useAppSelector((s) => s.state.user.emailAccounts);
  // linkedEmails.length === 0 && startLoader();
  const handleAddNew = () => {
    dispatch(setAddEmailProcessType({ type: EmailProvider.null }));
    router.push("/accounts/link");
  };

  useEffect(() => {
    syncUser();
  }, []);

  const showTestToast = () => {
    addToast({
      title: "TEST",
      message: "This is a test",
      appearance: "success",
    });
  };

  return (
    <div className="flex flex-1 flex-col p-5 k">
      <div
        className="flex flex-row justify-between items-center align-middle"
        style={{ width: "100%" }}
      >
        <div>
          <p className="header-1">Email Accounts</p>
          <p className="descriptive-1">
            Connect accounts to keep warm & send emails from
          </p>
        </div>
        <div className="flex flex-row items-center align-middle">
          {/* {linkedEmails?.length > 0 && (
            <img
              onClick={showTestToast}
              src="/svg/view-block.svg"
              className="mr-5 w-8 h-8 cursor-pointer"
            />
          )} */}
          <Button
            preset="secondary"
            title="Add New"
            onPress={handleAddNew}
            iconSrc={"/svg/link-black.svg"}
            iconStyle={{ height: "24px", width: "24px" }}
          />
        </div>
      </div>
      {!linkedEmails?.length ? (
        <div className="content-container">
          <img src="/svg/add-email-vector.svg" className="h-96 w-96" />
          <p className="header-2 mt-14 mb-7">
            <span className="text-4xl mr-3">👋</span> Add an email account to
            get started.
          </p>
          <Button
            onPress={handleAddNew}
            preset={"primary"}
            iconSrc={"/svg/link.svg"}
            title={"Add New"}
          />
        </div>
      ) : (
        <div>
          {linkedEmails.map((i) => (
            <div className="accounts_email-list-item-container justify-between">
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "22px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
                {i.emailAddress}
              </p>
              <div className="flex flex-row">
                <Menu
                  menuClassName={"home_email-options-menu-container"}
                  menuStyle={{ width: "80px" }}
                  menuButton={
                    <img
                      onClick={(e) => e.stopPropagation()}
                      src="/svg/more-gray.svg"
                      className="h-6 w-6  cursor-pointer"
                    />
                  }
                >
                  <MenuItem
                    className="flex flex-row items-center mb-1 cursor-pointer outline-none"
                    onClick={(e) => {
                      e.syntheticEvent.stopPropagation();
                      setSelectedAccount(i);
                      setEditModalOpen(true);
                    }}
                  >
                    <img src="/svg/edit-white.svg" className="h-5 w-5 mr-1" />
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        letterSpacing: "-0.12px",
                      }}
                    >
                      Edit
                    </p>
                  </MenuItem>
                  <MenuItem
                    className="flex flex-row items-center cursor-pointer outline-none"
                    onClick={(e) => {
                      e.syntheticEvent.stopPropagation();
                      setSelectedAccount(i);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <img src="/svg/trash.svg" className="h-5 w-5 mr-1" />
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        letterSpacing: "-0.12px",
                      }}
                    >
                      Delete
                    </p>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      )}
      <EditAccountModal
        account={selectedAccount}
        setOpen={setEditModalOpen}
        open={editModalOpen}
      />
       <DeleteAccountModal
        account={selectedAccount}
        setOpen={setDeleteModalOpen}
        open={deleteModalOpen}
      />
      
    </div>
  );
};

export default LinkedAccounts;
