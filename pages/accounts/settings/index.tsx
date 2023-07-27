import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../redux/store";
import Button from "../../../components/button";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { TabItem } from "../../../components/pageComponents/accounts/settings/tabItem";
import { Profile } from "../../../components/pageComponents/accounts/settings/profile";
import { ConnectedAccounts } from "../../../components/pageComponents/accounts/settings/connectedAccounts";

import { colors } from "../../../styles";
import { useLoader } from "../../../utils/providers";

export type TabSettings = "profile" | "connected-accounts";

const getLabel = (s: TabSettings) => {
  return s === "connected-accounts" ? "Connected Accounts" : "Profile";
};

const Settings = () => {
  const { startLoader, stopLoader } = useLoader();
  const currentStep = useAppSelector(
    (state) => state.state.addEmailState.currentStep
  );
  const router = useRouter();
  const auth = firebase.auth();
  const logOut = async () => {
    startLoader();
    await auth.signOut();
    router.replace({ pathname: "/login" });
    setTimeout(stopLoader, 100);
  };

  const { selected } = router.query;

  const [active, setActive] = useState<TabSettings | undefined>(
    selected === "profile"
      ? "profile"
      : selected === "connected-accounts"
      ? "connected-accounts"
      : "profile"
  );

  return (
    <div className="flex flex-1 flex-col p-5 k">
      <p className="header-1 mb-5">Account Settings</p>

      <div className="settings_content-container relative flex-row">
        <div
          className="flex flex-col"
          style={{
            borderRightWidth: "2px",
            borderColor: colors.light100,
            paddingInline: "30px",
            marginBlock: "30px",
            gap: "10px",
          }}
        >
          <TabItem
            onClick={() => setActive("profile")}
            isActive={active === "profile"}
            label="Profile"
          />

          <TabItem
            onClick={() => setActive("connected-accounts")}
            isActive={active === "connected-accounts"}
            label="Connected Accounts"
          />
        </div>
        <div className="flex flex-1 flex-col " style={{ padding: "30px" }}>
          <p className="h6">{getLabel(active)}</p>
          {active === "profile" ? <Profile /> : <ConnectedAccounts />}
        </div>
        <Button
          title="Log Out"
          preset="primary"
          containerStyle={{ position: "absolute", right: 20, bottom: 10 }}
          onPress={logOut}
        />
      </div>
    </div>
  );
};

export default Settings;
