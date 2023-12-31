import React, { useEffect, useState } from "react";
import Button from "../../../button";

import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { setCurrentHomeStep } from "../../../../redux/slices/steps";
import Router from "next/router";
import { HomeSteps } from "../../../../pages/home";
import Lottie from "react-lottie";
import * as loadingJson from "../../../../public/lottie/loading.json";
import { useProcessor } from "../../../../utils/processorProvider";
import { colors } from "../../../../styles";

export const Step4 = () => {
  const dispatch = useAppDispatch();
  const processing = useAppSelector((s) => s.state.processing);
  const csv = useAppSelector((s) => s.state.csv);
  const { startProcessing, progress, status } = useProcessor();
  const next = () => {
    console.log("next");
    dispatch(setCurrentHomeStep({ step: HomeSteps.completed }));
    Router.push({
      pathname: "/home",
      query: { step: HomeSteps.completed },
    });
  };

  useEffect(() => {
    csv.parseData?.length > 0 && startProcessing();
  }, [csv]);

  const prev = () => {
    dispatch(setCurrentHomeStep({ step: HomeSteps.mapColumns }));
    Router.push({
      pathname: "/home",
      query: { step: HomeSteps.mapColumns },
    });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-1 flex-col">
      <p className="header-1 mt-5">Brainstorm In Progress...</p>
      <p className="descriptive-1">
        Milo is currently pre-occupied writing emails, please patient.
      </p>
      <div className="home_mail-content-container items-center justify-center flex flex-col">
        <Lottie
          options={defaultOptions}
          height={280}
          width={280}
          isStopped={false}
          isPaused={false}

        />
        <p
          style={{
            fontSize: "16px",
            color: colors.success300,
            fontWeight: "bold",
          }}
        >
          {(progress / csv.parseData.length) * 100}%
        </p>
        <p style={{ fontSize: "12px", fontWeight: "bold" }}>{status}</p>
      </div>

      <div className="flex flex-row mt-5">
        <Button
          title="Back"
          iconSrc="/svg/arrow-left.svg"
          preset="secondary"
          containerStyle={{ marginRight: "16px" }}
          onPress={prev}
        />
        <Button
          title="Edit Emails"
          iconSrc="/svg/cursor-click-white.svg"
          preset="primary"
          // disabled={progress < csv.parseData.length / 2}
          // disabled={progress < 5}
          onPress={next}
        />
      </div>
    </div>
  );
};
