import React from "react";
import Button from "../../../button";

const data = [
  {
    img: "/svg/linkedin-logo.svg",
    title: "LinkedIn",
    message: "Connect your LinkedIn account",
    linked: false,
  },
  {
    img: "/svg/sso.svg",
    title: "SSO",
    message: "Connect your LinkedIn account",
    linked: false,
  },
  {
    img: "/svg/gmail-logo.svg",
    title: "Google",
    message: "georgematt56@gmail.com",
    linked: true,
  },
];

export const ConnectedAccounts = () => {
  return (
    <div className="basic-border-outline mt-5 gap-5 flex-col">
      {data.map((i) => (
        <div className="flex flex-row justify-between">
          <div className="flex-row flex">
            <img src={i.img} className="w-12 h-12 mr-5" />
            <div className="flex flex-col gap-2">
              <p className="h6">{i.title}</p>
              <p className="body-text-m">{i.message}</p>
            </div>
          </div>
          <Button
          containerStyle={{width:'120px'}}
            title={i.linked ? "Unlink":"Connect"}
            preset={i.linked ? "delete-outline" : "secondary"}
          />
        </div>
      ))}
    </div>
  );
};
