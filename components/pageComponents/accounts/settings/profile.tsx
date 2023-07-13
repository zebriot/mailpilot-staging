import React, { useState } from "react";
import { useAppSelector } from "../../../../redux/store";
import Button from "../../../button";
import { EditProfileModal } from "./editProfileModal";
import { colors } from "../../../../styles";
import DropDown from "../../../Dropdown";

const testSignatures = [
  { title: "Sight3 Sig", content: "" },
  { title: "MailPilot Sig", content: "" },
];

export const Profile = () => {
  const user = useAppSelector((s) => s.state.user);
  const [editModalVisible, setEditModalVisible] = useState(false);
  return (
    <>
      <div className="accounts_settings__profile-display-container mt-5">
        <div className="flex flex-row align-middle">
          <img
            src={user.photoUrl}
            style={{ height: "72px", width: "72px", borderRadius: "36px" }}
          />
          <div className="ml-5 justify-center flex flex-col gap-2">
            <p className="h6">{user.name}</p>
            <p className="body-text" style={{ color: colors.light300 }}>
              {user.jobTitle}
            </p>
          </div>
        </div>
        <Button
          title="Edit Profile"
          preset="secondary"
          onPress={() => setEditModalVisible(true)}
          containerStyle={{ alignSelf: "center" }}
        />
      </div>
      <EmailSignatures />
      <EditProfileModal open={editModalVisible} setOpen={setEditModalVisible} />
    </>
  );
};

const EmailSignatures = () => {
  const [selected, setSelected] = useState(testSignatures[0]);
  return (
    <>
      <p className="h6" style={{ marginTop: "30px", marginBottom: "20px" }}>
        Email Signatures
      </p>
      <div
        className="basic-border-outline flex flex-row flex-1"
        style={{ padding: 0, height: 300 }}
      >
        <div
          style={{
            borderRightWidth: "1px",
            height: "100%",
            borderColor: colors.light200,
          }}
          className="flex flex-col"
        >
          <div className="flex flex-col flex-1" style={{ width: "300px" }}>
            {testSignatures.map((i, index) => (
              <div
                onClick={() => setSelected(i)}
                className=" p-5 transition-all cursor-pointer duration-200"
                style={{
                  backgroundColor:
                    selected.title === i.title
                      ? colors.primary50
                      : colors.transparent,
                  borderTopLeftRadius: index === 0 ? "20px" : 0,
                }}
              >
                <p
                  className="body-text-l"
                  style={{
                    color:
                      selected.title === i.title
                        ? colors.primary400
                        : colors.neutral900,
                    fontWeight: selected.title === i.title ? 600 : 500,
                  }}
                >
                  {i.title}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-center items-center p-3 cursor-pointer">
            <img className="h-6 w-6 mr-1" src="/svg/plus-primary.svg" />
            <p className="body-text-l" style={{ color: colors.primary }}>
              New Signature
            </p>
          </div>
        </div>
        <div className="flex flex-1 bg-black"></div>
      </div>
      <p className="h6" style={{ marginTop: "30px", marginBottom: "20px" }}>
        Signature Defaults
      </p>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col">
          <p className="body-text-m" style={{ marginBottom: "10px" }}>
            For New Emails:
          </p>
          <DropDown
            options={testSignatures.map((i) => {
              return {
                value: i,
                label: i.title,
              };
            })}
          />
        </div>
        <div className="flex flex-col">
          <p className="body-text-m" style={{ marginBottom: "10px" }}>
            For Replies/Forwards:
          </p>
          <DropDown
            options={testSignatures.map((i) => {
              return {
                value: i,
                label: i.title,
              };
            })}
          />
        </div>
      </div>
    </>
  );
};
