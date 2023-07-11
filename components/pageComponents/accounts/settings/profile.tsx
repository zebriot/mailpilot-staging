import React, { useState } from "react";
import { useAppSelector } from "../../../../redux/store";
import Button from "../../../button";
import { EditProfileModal } from "./editProfileModal";
import { colors } from "../../../../styles";

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
        />
      </div>
      <EditProfileModal open={editModalVisible} setOpen={setEditModalVisible} />
    </>
  );
};
