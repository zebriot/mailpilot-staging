import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../redux/store";
import Button from "../../../button";
import { EditProfileModal } from "./editProfileModal";
import { colors } from "../../../../styles";
import DropDown from "../../../Dropdown";
import {
  ContentState,
  EditorState,
  RichUtils,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import {
  convertHTMLtoEditorState,
  debounce,
  updateUser,
  useToast,
} from "../../../../utils";
import { AnimatePresence, motion } from "framer-motion";
import { CancelDone } from "./partials/CancelDone";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
const htmlToDraft =
  typeof window !== "undefined" && require("html-to-draftjs").default;
import draftToHtml from "draftjs-to-html";

let lastTimeoutId;

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
  const savedSignatures = useAppSelector((s) => s.state.user.signatures);
  const signatureDefaults = useAppSelector(
    (s) => s.state.user.signatureDefaults
  );
  const [selected, setSelected] = useState<number | undefined>(0); // using undefined if the new signature ceration is in progress
  const [editing, setEditing] = useState<number | undefined>(undefined);
  const [deleting, setDeleting] = useState<number | undefined>(undefined);
  const [signatures, setSignatures] = useState(savedSignatures || []);
  const [sigDefaults, setSigDefaults] = useState(
    signatureDefaults || {
      forNewEmails: "",
      forForwards: "",
    }
  );
  const [editorState, setEditorState] = useState(
    convertHTMLtoEditorState(savedSignatures?.[0]?.content || "")
  );
  const [newSigState, setNewSigState] = useState({
    editorState: convertHTMLtoEditorState(""),
    title: "",
  });
  const [isNewSignature, setNewSignature] = useState(false);

  const newSigRef = useRef<HTMLInputElement>();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const { addToast } = useToast();

  const updateSignaturesToDatabase = async () => {
    clearTimeout(lastTimeoutId);
    const timeoutId = setTimeout(async () => {
      await updateUser({ signatures });
      lastTimeoutId &&
        addToast({
          appearance: "success",
          title: "Saved",
          message: "Your Signature config was saved successfully",
        });
    }, 3500);
    lastTimeoutId = timeoutId;
  };

  const updateSigDefaultsToDb = async () => {
    await updateUser({ signatureDefaults: sigDefaults });
  };

  const deleteSignature = () => {
    const sigToDelete = signatures[deleting];
    const updatedSigs = signatures.filter((i) => i.title !== sigToDelete.title);
    setSignatures(updatedSigs);
    updateUser({ signatures: updatedSigs }).then(() => {
      addToast({
        appearance: "success",
        title: "Deleted " + sigToDelete.title,
        message: sigToDelete.title + " was saved successfully deleted.",
      });
    });
    setSelected(0);
    setDeleting(undefined);
  };

  const addNewSignature = () => {
    if (!newSigState.title || !isNewNameValid()) {
      addToast({
        appearance: "error",
        title: "Disabled",
        message: "Title Not Valid !",
      });
      return;
    }
    if (!newSigState.editorState.getCurrentContent()) {
      addToast({
        appearance: "error",
        title: "Disabled",
        message: "Signature not Valid !",
      });
      return;
    }
    const updatedSigs = [
      ...signatures,
      {
        title: newSigState.title,
        content: draftToHtml(
          convertToRaw(newSigState.editorState.getCurrentContent())
        ),
      },
    ];
    setSignatures(updatedSigs);
    setSelected(updatedSigs.length - 1);
    setNewSignature(false);

    setNewSigState({ title: "", editorState: EditorState.createEmpty() });
    updateUser({
      signatures: updatedSigs,
    }).then(() => {
      addToast({
        appearance: "success",
        title: "Signature Created !",
        message: "Your new signature was saved succesfully !",
      });
    });
  };

  const handleSigTitleChange = (index: number, value: string) => {
    const temp = [...signatures];
    temp[index] = { ...temp[index], title: value };
    setSignatures(temp);
  };

  const handleEditorStateChange = (e: EditorState) => {
    setEditorState(e);

    if (selected !== undefined && typeof window !== "undefined") {
      const temp = [...signatures];
      temp[selected] = {
        ...temp[selected],
        content: draftToHtml(convertToRaw(e.getCurrentContent())),
      };
      setSignatures(temp);
    } else {
      setNewSigState((prev) => ({ ...prev, editorState: e }));
    }
  };

  const isNewNameValid = () => {
    const temp = signatures.map((i) => i.title === newSigState.title);
    return !temp.includes(true);
  };

  // Editing Related Functions
  const onStyleClick = (e) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, e.target.id));
  };

  const addLinkClick = () => {
    console.log(editorState.getSelection());
  };

  const handleLinkClick = () => {
    const url = prompt("Enter a URL:");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
  };

  const handleFontSizeChange = (event) => {
    const fontSize = event.target.value;
    const newEditorState = RichUtils.toggleInlineStyle(
      editorState,
      `FONT_SIZE_${fontSize}`
    );
    setEditorState(newEditorState);
  };

  const handleFontTypeChange = (event) => {
    const fontType = event.target.value;
    const newEditorState = RichUtils.toggleInlineStyle(
      editorState,
      `FONT_FAMILY_${fontType}`
    );
    setEditorState(newEditorState);
  };

  const handleLineSpacingChange = (event) => {
    const lineSpacing = event.target.value;
    const newEditorState = RichUtils.toggleInlineStyle(
      editorState,
      `LINE_SPACING_${lineSpacing}`
    );
    setEditorState(newEditorState);
  };

  // Use Effects
  useEffect(() => {
    if (isNewSignature) {
      setEditorState(EditorState.createEmpty());
      return;
    }
  }, [isNewSignature]);

  useEffect(() => {
    console.log(selected, signatures[selected]?.content);
    if (selected === undefined) {
      setEditorState(newSigState.editorState);
    }
    if (selected !== undefined && signatures && typeof window !== "undefined") {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(signatures[selected]?.content || "")
          )
        )
      );
    }
  }, [selected]);

  useEffect(() => {
    isNewSignature && newSigRef.current && newSigRef.current.focus();
  }, [isNewSignature, newSigRef.current]);

  useEffect(() => {
    updateSignaturesToDatabase();
    console.log("SAVING TO DATABASE", JSON.stringify(signatures));
  }, [JSON.stringify(signatures)]);

  useEffect(() => {
    updateSigDefaultsToDb();
  }, [sigDefaults]);

  if (typeof window === "undefined") return null;

  return (
    <>
      <p className="h6" style={{ marginTop: "30px", marginBottom: "20px" }}>
        Email Signatures
      </p>
      <div
        className="basic-border-outline flex flex-row flex-1"
        style={{ padding: 0, 
          // height: 300 
        }}
      >
        <div
          style={{
            borderRightWidth: "1px",
            height: "100%",
            borderColor: colors.light200,
          }}
          className="flex flex-col"
        >
          <div
            className="flex flex-col flex-1 overflow-auto"
            style={{ width: "300px" }}
          >
            {signatures.map((i, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(index);
                  setNewSignature(false);
                  setDeleting(undefined);
                }}
                className="p-5 transition-all cursor-pointer duration-200 flex flex-row justify-between parent__internal-div-visible"
                style={{
                  backgroundColor:
                    index === deleting
                      ? colors.danger50
                      : selected === index
                      ? colors.primary50
                      : colors.transparent,
                  borderTopLeftRadius: index === 0 ? "20px" : 0,
                }}
              >
                {editing === index ? (
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    maxLength={30}
                    autoFocus
                    style={{
                      backgroundColor: colors.transparent,
                      fontWeight: 600,
                      color: colors.primary400,
                    }}
                    onBlur={() => setEditing(undefined)}
                    className="body-text-l outline-none transition-all duration-200"
                    value={i.title}
                    onChange={(e) =>
                      handleSigTitleChange(index, e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateUser({ signatures });
                        inputRefs.current[index].blur();
                      }
                    }}
                  />
                ) : (
                  <p
                    className="body-text-l text-ellipsis overflow-hidden"
                    style={{
                      color:
                        deleting === index
                          ? colors.danger400
                          : selected === index
                          ? colors.primary400
                          : colors.neutral900,
                      fontWeight: selected === index ? 600 : 500,
                      width: "210px",
                    }}
                  >
                    {i.title}
                  </p>
                )}
                <div key={index} className="flex flex-row">
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(index);
                      setEditing(index);
                      setNewSignature(false);
                    }}
                    className="h-4 w-4 mr-1"
                    src="/svg/edit-white.svg"
                  />
                  <img
                    className="h-4 w-4 mr-1"
                    src="/svg/trash.svg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(index);
                      setDeleting(index);
                      setNewSignature(false);
                    }}
                  />
                </div>
              </div>
            ))}
            {isNewSignature && (
              <div
                className="transition-all cursor-pointer duration-200 flex flex-col justify-between"
                style={{
                  backgroundColor: colors.primary50,
                  borderTopLeftRadius: signatures.length === 0 ? "20px" : 0,
                }}
              >
                <input
                  onFocus={() => {
                    setSelected(undefined);
                  }}
                  ref={newSigRef}
                  placeholder="New Signature"
                  className="body-text-l outline-none p-5 w-full"
                  style={{ backgroundColor: colors.transparent }}
                  value={newSigState.title}
                  maxLength={30}
                  onChange={(e) => {
                    setNewSigState((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                />
                <AnimatePresence>
                  {!isNewNameValid() && (
                    <motion.p
                      initial={{ lineHeight: 0, opacity: 0, paddingBottom: 0 }}
                      animate={{
                        lineHeight: "18px",
                        opacity: 1,
                        paddingBottom: "8px",
                      }}
                      exit={{ lineHeight: 0, opacity: 0, paddingBottom: 0 }}
                      className="body-text-m px-5 "
                      style={{ color: colors.danger400 }}
                    >
                      Name Already Exists!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
          <div className="flex flex-row w-full justify-center items-center p-3 cursor-pointer">
            {deleting !== undefined ? (
              <CancelDone
                onCancelPress={() => {
                  setDeleting(undefined);
                }}
                onRightPress={deleteSignature}
                rightDisabled={false}
                rightColor={colors.danger400}
                leftColor={colors.light300}
                rightText="Delete"
              />
            ) : isNewSignature ? (
              <CancelDone
                onCancelPress={() => {
                  setNewSigState({
                    editorState: EditorState.createEmpty(),
                    title: "",
                  });
                  setNewSignature(false);
                }}
                onRightPress={addNewSignature}
                rightDisabled={!(newSigState.title && isNewNameValid())}
              />
            ) : (
              <>
                <img className="h-6 w-6 mr-1" src="/svg/plus-primary.svg" />
                <p
                  className="body-text-l text-center"
                  style={{
                    color: colors.primary,
                    display: "flex",
                  }}
                  onClick={() => {
                    if (isNewSignature) return;
                    setEditing(undefined);
                    setSelected(undefined);
                    setNewSignature(!isNewSignature);
                  }}
                >
                  New Signature
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col ">
          <div className="flex-box flex-row my-0 flex-1 flex-shrink flex-grow overflow-auto z-1 relative">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorStateChange}
              toolbarClassName="account__settings__toolbar"
              wrapperStyle={{ height: "100%", padding: 0 }}
              editorStyle={{ padding: 0, zIndex: 0 }}
              editorClassName="p-0 m-0"
              // wrapperClassName=" relative"
              toolbarHidden

              // toolbarStyle={{
              //   borderWidth: 0,
              //   borderTopWidth: "1px",
              //   padding: "10px",
              //   height: "75px",
              //   backgroundColor: colors.neutral100,
              //   borderColor: colors.light200,
              // }}
            />
          </div>
          <div
            className="items-center flex flex-row px-7"
            style={{
              height: "60px",
              marginTop: 0,
              borderTopWidth: "1px",
              borderColor: colors.light200,
            }}
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
              onClick={handleLinkClick}
            />
            <img src="/svg/vertical-line.svg" className="w-1 h-7 mx-4" />

            <select onChange={handleFontSizeChange}>
              <option value="">Font Size</option>
              <option value="SMALL">Small</option>
              <option value="MEDIUM">Medium</option>
              <option value="LARGE">Large</option>
            </select>
            <img src="/svg/vertical-line.svg" className="w-1 h-7 mx-4" />

            <select onChange={handleFontTypeChange}>
              <option value="">Font Type</option>
              <option value="ARIAL">Arial</option>
              {/* <option value="TIMES_NEW_ROMAN">Times New Roman</option> */}
              <option value="VERDANA">Verdana</option>
            </select>
            <img src="/svg/vertical-line.svg" className="w-1 h-7 mx-4" />

            <select onChange={handleLineSpacingChange}>
              <option value="">Line Spacing</option>
              <option value="SINGLE">Single</option>
              <option value="1_5">1.5</option>
              <option value="DOUBLE">Double</option>
            </select>
          </div>
        </div>
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
            value={{
              value: sigDefaults.forNewEmails,
              label: sigDefaults.forNewEmails,
            }}
            onChange={(s: { label: string; value: string }) => {
              setSigDefaults((prev) => ({
                ...prev,
                forNewEmails: s?.value as string,
              }));
            }}
            options={savedSignatures?.map((i) => {
              return {
                value: i.title,
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
            value={{
              value: sigDefaults.forForwards,
              label: sigDefaults.forForwards,
            }}
            onChange={(s: { label: string; value: string }) => {
              setSigDefaults((prev) => ({
                ...prev,
                forForwards: s?.value as string,
              }));
            }}
            options={savedSignatures?.map((i) => ({
              value: i.title,
              label: i.title,
            }))}
          />
        </div>
      </div>
    </>
  );
};
