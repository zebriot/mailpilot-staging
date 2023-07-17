import { AnimatePresence, motion } from "framer-motion";
import React, { ClassAttributes, useEffect, useRef } from "react";
import ReactModal from "react-modal";
import { Form, Formik, useFormikContext } from "formik";

import Button from "../../../button";
import { colors } from "../../../../styles";
import Input from "../../../Input";
import TextArea from "../../../TextArea";
import { useAppSelector } from "../../../../redux/store";
import { updateUser, useToast } from "../../../../utils";

export const EditProfileModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
}) => {
  const user = useAppSelector((s) => s.state.user);
  const { addToast } = useToast();
  const imgSelectRef = useRef<HTMLInputElement>();

  const handleFileUpload = (event, setFieldValue) => {
    console.log("event :", event);

    let reader = new FileReader();

    let file = event.target.files[0];
    console.log("event.target.files[0] :", event.target.files[0]);
    reader.onloadend = () => {
      // Use a regex to remove data url part
      const base64String = reader.result;
      console.log("base64String", base64String);
      setFieldValue("photoUrl", base64String);
      // Logs wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(file);
    return;
  };

  return (
    <ReactModal isOpen={open} className="z-20">
      <AnimatePresence>
        {open && (
          <motion.div
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home_select-email-modal-container z-20"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            style={{ zIndex: 99 }}
          >
            <div
              className="home_select-emial-modal-content-container relative z-30 p-10"
              onClick={(e) => e.stopPropagation()}
              style={{ zIndex: 99 }}

            >
              <Formik
                initialValues={user}
                validate={(values) => {
                  let errors: any = {};
                  if (!values.name) {
                    errors.name = "Required";
                  }
                  if (!values.jobTitle) {
                    errors.jobTitle = "Required";
                  }
                  if (values.company.description?.length < 40) {
                    errors = {
                      ...errors,
                      company: {
                        description:
                          "Type in a bit more for a better understanding",
                      },
                    };
                  }
                  if (!values.company.name) {
                    if(errors?.company){
                      errors.company.name = "Required";
                    }else{
                      errors = {
                        ...errors,
                        company: {
                          name:
                          "Required"
                        },
                      };
                    }
                    errors.company.name = "Required";
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  await updateUser(values);
                  addToast({
                    title: "Profile Updated",
                    message: "Your profile was successfully updated.",
                    appearance: "success",
                  });
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,

                  handleChange,
                  handleBlur,
                  isSubmitting,
                  submitForm,
                  isValid,
                  setFieldValue,
                  /* and other goodies */
                }) => (
                  <Form>
                    <div className="flex flex-row justify-between">
                      <p className="h3">Edit your MailPilot profile</p>
                      <Button
                        title="Save"
                        preset="secondary"
                        onPress={submitForm}
                        loading={isSubmitting}
                        disabled={!isValid}
                        containerStyle={{ width: "100px" }}
                      />
                    </div>
                    <p className="h5 mt-5 mb-3">Basic Information</p>
                    <div
                      style={{
                        paddingLeft: "20px",
                        paddingBlock: "10px",
                        borderLeftWidth: "1px",
                        borderColor: colors.light300,
                      }}
                    >
                      <p className="body-text-xl">Profile Photo</p>
                      <div
                        onClick={() =>
                          imgSelectRef?.current && imgSelectRef.current.click()
                        }
                        style={{
                          height: "122px",
                          width: "122px",
                          borderRadius: "20px",
                          background: colors.light200,
                          marginTop: "10px",
                          marginBottom: "20px",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          id="profileImage"
                          src={values.photoUrl}
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "20px",
                          }}
                        />
                        <input
                          id="file"
                          name="file"
                          type="file"
                          ref={imgSelectRef}
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const res = handleFileUpload(e, setFieldValue);
                            setFieldValue("photoUrl", res);
                          }}
                        />
                      </div>
                      <div className="flex flex-row gap-5">
                        <Input
                          labelClass="body-text-xl"
                          label="Full name"
                          placeholder="John Doe"
                          style={{ width: "380px" }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          name="name"
                          error={errors?.name}
                        />
                        <Input
                          labelClass="body-text-xl"
                          label="Job Title"
                          placeholder="Writer"
                          style={{ width: "380px" }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.jobTitle}
                          name="jobTitle"
                          error={errors?.jobTitle}
                        />
                      </div>
                      <Input
                        labelClass="body-text-xl"
                        label="Company name"
                        placeholder="The company that you represent"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.company.name}
                        name="company.name"
                        error={errors?.company?.name}
                      />
                      <TextArea
                        labelClass="body-text-xl"
                        placeholder="Eg: A creative branding and development agency with a focus on web3 and AI..."
                        label="What does your company do?"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.company.description}
                        name="company.description"
                        error={errors?.company?.description}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReactModal>
  );
};
