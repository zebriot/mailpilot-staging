import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import {
  ContentState,
  EditorState,
  RichUtils,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import Button from "../../../button";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  addToEmails,
  updateEmailAtIndex,
} from "../../../../redux/slices/steps";
import { colors } from "../../../../styles";
import {
  callDaVinci,
  convertHTMLtoEditorState,
  getCharCount,
  getWordCount,
  parseEmailFromOpenAI,
  scrapeData,
  sendEmail,
  validateEmail,
} from "../../../../utils";
import { useToast } from "../../../../utils/toastProvider";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
const htmlToDraft =
  typeof window === "object" && require("html-to-draftjs").default;
// const draftToHtml =
//   typeof window === "object" && require("draftjs-to-html").default;
import draftToHtml from "draftjs-to-html";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import htmlToDraft from "html-to-draftjs";

export const Step5 = () => {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const [editorState, setEditorState] = useState(convertHTMLtoEditorState(""));

  const prev = () => {
    setIndex(index - 1);
  };

  const [subject, setSubject] = useState("");
  const [index, setIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | undefined>(undefined);
  const [currentlyRegenerating, setCurrentlyRegenerating] = useState<
    number | undefined
  >(undefined);
  const [currentlySending, setCurrentlySending] = useState<number | undefined>(
    undefined
  );
  const emails = useAppSelector((state) => state.state.emails);
  const user = useAppSelector((state) => state.state.user);
  const selectedEmailConfig = useAppSelector(
    (state) => state.state.selectedEmailConfig
  );

  const csv = useAppSelector((state) => state.state.csv);

  const regenerateEmailAtIndex = async () => {
    setCurrentlyRegenerating(index);
    const email = await callDaVinci(user, emails[index].metadata);
    const res = parseEmailFromOpenAI(email);
    dispatch(
      updateEmailAtIndex({
        email: res,
        index,
      })
    );
    setCurrentlyRegenerating(undefined);
    addToast({
      appearance: "success",
      title: "Email Regenerated !",
      message: `Your email for ${
        emails[index].data?.[csv.labels.website]
      } was succesfully regenerated.`,
    });
  };

  // Editing Related Functions
  const onStyleClick = (e) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, e.target.id));
  };

  const addLinkClick = () => {
    console.log(editorState.getSelection());
  };

  const send = async () => {
    setCurrentlySending(index);
    const emailArr = emails[index].data?.[csv.labels.email]
      ?.split(";")
      ?.filter((i) => validateEmail(i));
    if (emailArr?.length === 0) {
      addToast({
        appearance: "error",
        title: "No Email Found !",
        message: `Check your spreadsheet for the domain : ${
          emails[index].data?.[csv.labels.website]
        }`,
      });
      setCurrentlySending(undefined);
      return;
    }
    const resSend = await sendEmail({
      emailConfig: selectedEmailConfig,
      email: {
        email: emails[index]?.email.content,
        subject: emails[index]?.email.subject,
      },
      toAddress: emailArr[0],
      fromName: user.name || user.company.name,
    });
    if (resSend) {
      addToast({
        appearance: "success",
        title: "Email Sent !",
        message: `The email was successfully sent to ${emailArr[0]}`,
      });
    } else {
      addToast({
        appearance: "error",
        title: "Unable to Send Email !",
        message: `Make sure you are using the correct password or try later.`,
      });
    }
    setCurrentlySending(undefined);
  };

  const onCopy = () => {
    setCopiedIndex(index);

    navigator.clipboard.writeText(
      editorState.getCurrentContent().getPlainText("")
    );

    setTimeout(() => setCopiedIndex(undefined), 3000);
  };

  // handling index change
  useEffect(() => {
    if (emails?.length > 0 && emails[index]?.email) {
      // const res = parseEmailFromOpenAI(emails[index]?.email);
      setSubject(emails[index]?.email.subject);

      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(emails[index]?.email.content)
          )
        )
      );
    }
  }, [index]);

  const onSubjectChange = (val: string) => {
    setSubject(val);
    dispatch(
      updateEmailAtIndex({
        email: {
          subject: val,
        },
        index,
      })
    );
  };

  const onEditorStateChange = (e) => {
    setEditorState(e);
    if (index !== undefined && typeof window !== "undefined") {
      dispatch(
        updateEmailAtIndex({
          email: {
            content: draftToHtml(convertToRaw(e.getCurrentContent())),
          },
          index,
        })
      );
      // const temp = [...email];
      // temp[index] = {
      //   ...temp[index],
      //   content: ,
      // };
      // setSignatures(temp);
    }
  };

  if (typeof window === "undefined") return null;

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 300px)" }}>
      <div className="home_mail-content-container mt-4 flex-1 flex flex-col ">
        <div
          className="border-bottom-light items-center flex flex-row px-5 mt-1"
          style={{ paddingBlock: "10px" }}
        >
          <div className="flex flex-1 flex-row items-center">
            <p
              className="flex flex-1"
              style={{
                color: colors.light300,
                fontSize: "14.5px",
                fontWeight: "500",
              }}
            >
              Subject:{" "}
              <input
                aria-expanded={false}
                className="mx-2 outline-none w-full"
                style={{ color: colors.blackLogo, fontWeight: "600" }}
                onChange={(e) => onSubjectChange(e.target.value)}
                value={subject}
              ></input>
            </p>
            <div className="flex items-center cursor-pointer">
              <img
                className="h-6 w-6 mr-2"
                src="/svg/copy.svg"
                onClick={onCopy}
              />
              <p
                onClick={onCopy}
                style={{
                  fontSize: "14.5px",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  color: colors.primary,
                }}
                className="transition-all"
              >
                {copiedIndex === undefined ? "Copy" : "Copied"}
              </p>
            </div>
          </div>
          <img
            src="/svg/vertical-line.svg"
            style={{ height: "21px", width: "2px", marginInline: "16px" }}
          />
          {/* <Button
            disabled={currentlyRegenerating !== undefined}
            loading={index === currentlyRegenerating}
            title="Regenerate"
            iconSrc="/svg/refresh.svg"
            preset="primary"
            iconStyle={{ height: "24px", width: "24px" }}
            onPress={regenerateEmailAtIndex}
            containerStyle={{ width: "140px" }}
          />
          <img
            src="/svg/vertical-line.svg"
            style={{ height: "21px", width: "2px", marginInline: "16px" }}
          /> */}
          <Button
            disabled={currentlySending !== undefined}
            loading={index === currentlySending}
            title="Send"
            iconSrc="/svg/send-white.svg"
            onPress={send}
            preset="primary"
            containerStyle={{ width: "95px" }}
          />
        </div>
        <SimpleBar
          forceVisible
          className="flex flex-row my-0 flex-1 overflow-auto z-1 relative flex-grow flex-shrink relative"
        >
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperStyle={{
              height: "100%",
              padding: 0,
              margin: 0,
            }}
            editorStyle={{ padding: 0, zIndex: 0 }}
            editorClassName="p-0 m-0"
            toolbarHidden
          />
        </SimpleBar>
        <div
          className="items-center flex flex-row px-5 border-top-light"
          style={{ height: "50px", marginTop: 0 }}
        >
          <img
            src="/svg/eye.svg"
            className="w-[13px] h-[13px] cursor-pointer"
          />
          <img
            src="/svg/vertical-line.svg"
            className="w-[3px] h-6 mx-[13px] "
          />
          <img
            src="/svg/bold.svg"
            onClick={onStyleClick}
            className="w-[19px] h-[19px] cursor-pointer"
            id="BOLD"
          />
          <img
            src="/svg/italic.svg"
            onClick={onStyleClick}
            className="w-19px h-19px mx-[13px] cursor-pointer"
            id="ITALIC"
          />
          <img src="/svg/font.svg" className="w-4 h-4 cursor-pointer" />
          <img src="/svg/vertical-line.svg" className="w-[3px] h-6 mx-[13px]" />
          <img
            src="/svg/link-2.svg"
            className="w-4 h-4 cursor-pointer"
            onClick={addLinkClick}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between mt-2">
        <p
          style={{
            fontFamily: "Inter",
            fontWeight: "600",
            fontSize: "13px",
            lineHeight: "16px",
            color: "#98A2B3",
          }}
        >
          {getWordCount(editorState)} Words {String.fromCharCode(0x2022)}{" "}
          {getCharCount(editorState)} Characters
        </p>
        <p
          style={{
            fontFamily: "Inter",
            fontWeight: "600",
            fontSize: "13px",
            lineHeight: "16px",
            color: "#98A2B3",
          }}
        >
          {index + 1}/{emails?.length}
        </p>
      </div>
      <div className="flex flex-row mt-5 justify-between items-center align-middle">
        <Button
          title="Previous"
          iconSrc="/svg/arrow-left.svg"
          preset="secondary"
          onPress={prev}
          disabled={index === 0}
        />
        <div className="flex flex-row items-center align-middle ">
          <Button
            disabled
            title="Send All"
            iconSrc="/svg/send-white.svg"
            preset="primary"
            containerStyle={{ marginRight: "20px" }}
          />
          <Button
            title="Next"
            disabled={index + 1 === emails?.length}
            iconSrc="/svg/arrow-next.svg"
            preset="secondary"
            iconPosition="right"
            onPress={() => setIndex(index + 1)}
          />
        </div>
      </div>
    </div>
  );
};
