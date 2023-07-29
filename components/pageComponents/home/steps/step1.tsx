import React from "react";
import Button from "../../../button";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  setCurrentHomeStep,
  PurposeType,
  setHomePurposeType,
} from "../../../../redux/slices/steps";
import { colors } from "../../../../styles";
import Router from "next/router";
import { HomeSteps } from "../../../../pages/home";

const SelectedCheck = () => {
  return (
    <div className="flex h-[26px] w-[26px] rounded-lg bg-neutral100 items-center justify-center absolute right-4 top-4">
      <img src="/svg/tick-black.svg" className="h-[13px] w-[13px]" />
    </div>
  );
};

export const Step1 = () => {
  const dispatch = useAppDispatch();

  const selectedPurpose = useAppSelector(
    (state) => state.state.homeState.purpose
  );

  const next = () => {
    console.log("next");
    dispatch(setCurrentHomeStep({ step: HomeSteps.uploadCSV }));
    Router.push({
      pathname: "/home",
      query: { step: HomeSteps.uploadCSV },
    });
  };

  const setPurpose = (e: PurposeType) => {
    dispatch(setHomePurposeType({ purpose: e }));
  };

  console.log("SELECTED PURPOSE : ", selectedPurpose);

  return (
    <div>
      <p className="header-1 mt-5">Select Email Type</p>
      <p className="descriptive-1">
        Begin from scratch or view drafts & saved templates.
      </p>
      <div className="options-container">
        <div
          onClick={() => setPurpose(PurposeType.campaign)}
          className={`home_tilt-container-negative flex-col cursor-pointer ${
            selectedPurpose === PurposeType.campaign && "selected"
          }`}
        >
          <img
            src={`/svg/campaign-${
              selectedPurpose === PurposeType.campaign ? "white" : "primary"
            }.svg`}
            className="h-16 w-16"
          />
          <p
            style={{
              marginTop: "16px",
              fontFamily: "Inter",
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "19px",
              color:
                selectedPurpose === PurposeType.campaign
                  ? "#fff"
                  : colors.blackLogo,
            }}
          >
            {PurposeType.campaign}
          </p>
          {selectedPurpose === PurposeType.campaign && <SelectedCheck />}
        </div>
        <div
          onClick={() => setPurpose(PurposeType.editEmails)}
          className={`home_tilt-container flex-col cursor-pointer ${
            selectedPurpose === PurposeType.editEmails && "selected"
          }`}
        >
          <img
            src={`/svg/cursor-click-${
              selectedPurpose === PurposeType.editEmails ? "white" : "primary"
            }.svg`}
            className="h-16 w-16"
          />
          <p
            style={{
              color:
                selectedPurpose === PurposeType.editEmails
                  ? "#fff"
                  : colors.blackLogo,
              marginTop: "16px",
              fontFamily: "Inter",
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "19px",
            }}
          >
            {PurposeType.editEmails}
          </p>
          {selectedPurpose === PurposeType.editEmails && <SelectedCheck />}
        </div>
        <div className="h-96 flex flex-1 align-middle justify-center items-center flex-col">
          <p
            style={{
              fontFamily: "Inter",
              fontWeight: "600",
              fontSize: "56px",
              lineHeight: "85px",
              textAlign: "center",
            }}
          >
            👀
          </p>
          <p
            style={{
              marginTop: "8px",
              color: "#000",
              fontFamily: "Inter",
              fontWeight: "600",
              textAlign: "center",
              fontSize: "16px",
              lineHeight: "19px",
            }}
          >
            A LOT more
            <br />
            coming soon...
          </p>
        </div>
      </div>

      <div className="flex flex-row mt-4">
        {/* <Button
          title="Cancel"
          iconSrc="/svg/arrow-left.svg"
          preset="secondary"
          containerStyle={{ marginRight: "20px" }}
        /> */}
        <Button
          title="Continue"
          preset="primary"
          onPress={next}
          disabled={selectedPurpose === PurposeType.null}
        />
      </div>
    </div>
  );
};
