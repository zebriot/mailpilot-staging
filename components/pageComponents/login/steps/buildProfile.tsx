import React, { useEffect, useMemo, useState } from "react";
import { colors } from "../../../../styles";
import Input from "../../../Input";
import TextArea from "../../../TextArea";
import TagInput from "../../../TagInput";
import { UserConfig, createUser } from "../../../../utils";
import Button from "../../../button";
import firebase from "firebase/compat/app";
import { useLoader } from "../../../../utils/providers";
import Router from "next/router";
import { useAppSelector } from "../../../../redux/store";

export const BuildProfile = () => {
  const currentUser = firebase.auth().currentUser;
  const userInStore = useAppSelector((s) => s.state.user);
  const [descriptionTags, setDescriptionTags] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errors, setErrors] = useState({
    jobTitle: "",
    companyName: "",
    companyDescription: "",
    name: "",
    tags: "",
  });
  const { startLoader, stopLoader } = useLoader();

  console.log("USER IN STORE ", userInStore);

  useEffect(() => {
    setName(currentUser?.displayName || localStorage.getItem("MAILPILOT_linkedIn_name"));
  }, [currentUser]);

  const onSave = async () => {
    const isValid = validate();

    if (!isValid) return;
    startLoader();
    setButtonLoading(true);
    const user = {
      email:
        currentUser?.email || localStorage.getItem("MAILPILOT_linkedIn_name"),
      photoUrl:
        currentUser?.photoURL ||
        localStorage.getItem("MAILPILOT_linkedIn_photoUrl"),
      name,
      jobTitle,
      description: descriptionTags,
      company: { name: companyName, description: companyDescription },
      emailAccounts: [],
    };
    await createUser(user);
    setButtonLoading(false);
    stopLoader();
    Router.push({
      pathname: "/home",
    });
  };

  const validate = () => {
    let tempErrors = { ...errors };
    if (name?.length === 0) {
      tempErrors.name = "Name Required";
    }
    if (jobTitle?.length === 0) {
      tempErrors.jobTitle = "Job Title Required";
    }
    if (companyDescription?.length < 40) {
      tempErrors.companyDescription =
        "Please input a bit more about your company";
    }
    if (companyName?.length === 0) {
      tempErrors.companyName = "Company Name Required";
    }
    if (descriptionTags?.length === 0) {
      tempErrors.tags = `Press "Enter" after typing in a tag (Upto 4 tags)`;
    }
    console.log("TEMP ERRORS : ", tempErrors);
    setErrors(tempErrors);
    const res = Object.keys(tempErrors).map((i) => tempErrors[i] === "");
    return !res?.includes(false);
  };

  useEffect(() => {
    if (name?.length > 0 && errors?.name) {
      setErrors((prevState) => ({ ...prevState, name: "" }));
    }
    if (jobTitle?.length > 0 && errors?.jobTitle) {
      setErrors((prevState) => ({ ...prevState, jobTitle: "" }));
    }
    if (companyDescription?.length > 40 && errors?.companyDescription) {
      setErrors((prevState) => ({ ...prevState, companyDescription: "" }));
    }
    if (companyName?.length > 0 && errors?.companyName) {
      setErrors((prevState) => ({ ...prevState, companyName: "" }));
    }
    if (descriptionTags?.length > 0 && errors?.tags) {
      setErrors((prevState) => ({ ...prevState, tags: "" }));
    }
  }, [name, companyName, descriptionTags, jobTitle, companyDescription]);

  return (
    <>
      <div className="content-child-container-pre-login">
        <p className="text-5xl mt-12 mb-6 text-center font-medium">
          🛠️️ We’ll need you to
          <br />
          build your profile
        </p>
        <div className="flex-1 mb-2 w-full">
          <div className="flex-row flex w-full">
            <Input
              containerClass="mr-2"
              label="What's your name?"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <Input
              containerClass="ml-2"
              label="What’s your job title??"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              error={errors.jobTitle}
            />
          </div>
          <Input
            label="What’s your company called ?"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            error={errors.companyName}
          />
          <TagInput
            tags={descriptionTags}
            setTags={(e) => {
              if (descriptionTags?.length < 4) {
                setDescriptionTags(e);
              } else {
              }
            }}
            label="How would you describe yourself?"
            placeholder="Start typing to select keywords..."
            error={errors.tags}
          />
          <TextArea
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            label="What does your company do?"
            placeholder="Eg: A creative branding and development agency with a focus on web3 and AI"
            error={errors.companyDescription}
          />
        </div>
        <Button
          onPress={onSave}
          loading={buttonLoading}
          title="Let's Start"
          preset="primary"
          containerStyle={{ width: "100%", marginBottom: "20px" }}
        />
        <p className="text-light">
          The information you provide here will be used as the
          <br />
          <p style={{ color: colors.primary }}>'Sender'</p> details for our AI
          when drafting emails.
        </p>
      </div>
    </>
  );
};

export const TagSelector = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  return (
    <div>
      <Input
        label="How would you describe yourself?"
        placeholder="Start typing to select keywords..."
      />
      <div className="flex-row flex-1 flex">
        {selectedTags.map((i) => (
          <div className="">{i}</div>
        ))}
      </div>
    </div>
  );
};
