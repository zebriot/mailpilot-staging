import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import {
  ContentState,
  EditorState,
  RichUtils,
  convertFromHTML,
} from "draft-js";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";
import createImagePlugin from "draft-js-image-plugin";

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

import Button from "../../../button";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  addToEmails,
  updateEmailAtIndex,
} from "../../../../redux/slices/steps";
import { colors } from "../../../../styles";
import { callDaVinci, scrapeData } from "../../../../utils";

const convertHTMLtoEditorState = (html: string) => {
  const blocksFromHTML = convertFromHTML(html);
  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return EditorState.createWithContent(content);
};

const getWordCount = (state: EditorState) => {
  const plainText = state.getCurrentContent().getPlainText("");
  const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
  const cleanString = plainText.replace(regex, " ").trim(); // replace above characters w/ space
  const wordArray = cleanString.match(/\S+/g); // matches words according to whitespace
  return wordArray ? wordArray.length : 0;
};

const getCharCount = (state: EditorState) => {
  const plainText = state.getCurrentContent().getPlainText("");
  const cleanString = plainText.replace(/\s/g, "").trim(); // replace above characters w/ space
  return cleanString.length;
};

export const Step5 = () => {
  const dispatch = useAppDispatch();

  const [editorState, setEditorState] = useState(convertHTMLtoEditorState(""));

  const prev = () => {
    setIndex(index - 1);
    // dispatch(setCurrentHomeStep({ step: HomeSteps.brainstorming }));
    // Router.push({
    //   pathname: "/home",
    //   query: { step: HomeSteps.brainstorming },
    // });
  };

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [metadata, setMetadata] = useState("");
  const [index, setIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | undefined>(undefined);
  const [currentlyRegenerating, setCurrentlyRegenerating] = useState<
    number | undefined
  >(undefined);

  const editorRef = useRef<Editor>();
  const emails = useAppSelector((state) => state.state.emails);

  const addEmail = (x: { email: string; metadata: any; data: any }) => {
    dispatch(addToEmails(x));
  };

  const csv = useAppSelector((state) => state.state.csv);

  const regenerateEmailAtIndex = async () => {
    setCurrentlyRegenerating(index);
    const email = await callDaVinci(emails[index].metadata);
    dispatch(updateEmailAtIndex({ email, index }));
    setCurrentlyRegenerating(undefined);
  };

  // Editing Related Functions
  const onStyleClick = (e) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, e.target.id));
  };

  const addLinkClick = () => {
    console.log(editorState.getSelection());
  };

  // as soon as on step-5, begin the email generation process if data is present
  useEffect(() => {
    if (csv.parseData?.length > 0) {
      // scrapeData(
      //   csv.labels.website,
      //   csv.parseData,
      //   setProgress,
      //   setStatus,
      //   setMetadata,
      //   addEmail
      // );
    }
  }, []);

  const send = () => {
    console.log(emails[index]?.metadata);
  };

  const onCopy = () => {
    setCopiedIndex(index);

    navigator.clipboard.writeText(
      editorState.getCurrentContent().getPlainText("")
    );
    setTimeout(() => setCopiedIndex(undefined), 1000);
  };

  // handling index change
  useEffect(() => {
    if (emails?.length > 0 && emails[index]?.email)
      setEditorState(convertHTMLtoEditorState(emails[index]?.email));
  }, [index, emails?.length > 0]);

  const handlePastedFiles = (fileArr) => {};

  return (
    <div className="flex flex-1 flex-col">
      <div className="home_mail-content-container mt-5 flex flex-1 flex-col">
        <div
          className="border-bottom-light items-center  flex flex-row px-7 mt-1"
          style={{ width: "100%", height: "70px" }}
        >
          <div className="flex flex-1 flex-row cursor-pointer">
            <p
              className="flex flex-1"
              style={{
                color: colors.light300,
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Subject:{" "}
              <p
                className="ml-2"
                style={{ color: colors.blackLogo, fontWeight: "600" }}
              >
                Issues spotted on your platform
              </p>
            </p>
            <img
              className="h-6 w-6 mr-2"
              src="/svg/copy.svg"
              onClick={onCopy}
            />
            <p
              onClick={onCopy}
              style={{
                fontSize: "18px",
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
          <img
            src="/svg/vertical-line.svg"
            style={{ height: "26px", width: "2px", marginInline: "20px" }}
          />
          <Button
            disabled={currentlyRegenerating !== undefined}
            loading={index === currentlyRegenerating}
            title="Regenerate"
            iconSrc="/svg/refresh.svg"
            preset="primary"
            iconStyle={{ height: "30px", width: "30px" }}
            onPress={regenerateEmailAtIndex}
            containerStyle={{ width: "190px" }}
          />
          <img
            src="/svg/vertical-line.svg"
            style={{ height: "26px", width: "2px", marginInline: "20px" }}
          />
          <Button
            title="Send"
            iconSrc="/svg/send-white.svg"
            onPress={send}
            preset="primary"
          />
        </div>
        <div
          className="flexbox flex-row my-0 flex-shrink-0 flex-grow basis-0 "
          style={{
            height: "600px",
          }}
        >
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            plugins={plugins}
            ref={editorRef}
          />
        </div>
        <div
          className="items-center flex flex-row px-7 border-top-light"
          style={{ height: "60px", marginTop: 0 }}
        >
          <img src="/svg/eye.svg" className="w-4 h-4 cursor-pointer" />
          <img src="/svg/vertical-line.svg" className="w-1 h-7 mx-4 " />
          <img
            src="/svg/bold.svg"
            onClick={onStyleClick}
            className="w-6 h-6 cursor-pointer"
            id="BOLD"
          />
          <img
            src="/svg/italic.svg"
            onClick={onStyleClick}
            className="w-6 h-6 mx-4 cursor-pointer"
            id="ITALIC"
          />
          <img src="/svg/font.svg" className="w-5 h-5 cursor-pointer" />
          <img src="/svg/vertical-line.svg" className="w-1 h-7 mx-4" />
          <img
            src="/svg/link-2.svg"
            className="w-5 h-5 cursor-pointer"
            onClick={addLinkClick}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <p
          style={{
            fontFamily: "Inter",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "19px",
            color: "#98A2B3",
            marginTop: "10px",
          }}
        >
          {getWordCount(editorState)} Words {String.fromCharCode(0x2022)}{" "}
          {getCharCount(editorState)} Characters
        </p>
        <p
          style={{
            fontFamily: "Inter",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "19px",
            color: "#98A2B3",
            marginTop: "10px",
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
