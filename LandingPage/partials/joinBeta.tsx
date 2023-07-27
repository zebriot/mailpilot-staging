import { AnimatePresence, color, motion } from "framer-motion";
import React, { ClassAttributes, useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { Form, Formik, useFormikContext } from "formik";
import TextArea from "../../components/TextArea";
import Input from "../../components/Input";
import { useToast, validateEmail } from "../../utils";
import Button from "../../components/button";
import { colors } from "../../styles";

// import Button from "../../../button";
// import { colors } from "../../../../styles";
// import Input from "../../../Input";
// import TextArea from "../../../TextArea";
// import { useAppSelector } from "../../../../redux/store";
// import { updateUser, useToast } from "../../../../utils";

export const JoinBetaModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
}) => {
  //   const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToast();

  const [buttonLoading, setButtonLoading] = useState(false);
  useEffect(() => {
    const container = document.getElementById("join-beta-container");
    container && container.addEventListener("wheel", (e) => e.preventDefault());
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="join-beta-container"
          transition={{ duration: 0.2 }}
          initial={{ opacity: 0, top: 0 }}
          animate={{ opacity: 1, top: 0 }}
          exit={{ opacity: 0, top: 0 }}
          className="home_select-email-modal-container fixed cursor-none "
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          style={{ zIndex: 1000 }}
        >
          <motion.div
            id="join-beta-modal-content"
            transition={{ duration: 0.4, type: "spring" }}
            initial={{ marginTop: "100vh" }}
            animate={{ marginTop: 0 }}
            exit={{ marginTop: "100vh" }}
            className="p-10 flex flex-col flex-1 bg-neutral100 "
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 99999999, width: "100%", height: "100vh" }}
          >
            <div className="flex justify-between">
              <div />
              <Button
                title="Close"
                preset="secondary"
                onPress={() => setOpen(false)}
                cursor={false}
              />
            </div>
            <div className="flex flex-1 flex-col md:flex-row justify-center items-center">
              <div className=" w-1/2 flex flex-col  justify-center px-[4vw]  sm:w-10/12 mb-[5vh]">
                <img
                  src="/svg/mail-pilot-logo.svg"
                  alt="Logo"
                  className="hidden logo-default md:flex"
                />
                <p
                  className="text-[8vw] leading-[8vw] md:text-[5vw] md:leading-[6vw] "
                  style={{
                    fontWeight: 600,
                    marginBlock: "1vw",
                  }}
                >
                  Apply for
                  <br />
                  Early Access
                </p>
                <p
                  className="text-[16px] md:text-[1.5vw]"
                  style={{
                    fontFamily: "Lexend",
                    // fontSize: "1.5vw",
                    // lineHeight: "2vw",
                    fontWeight: 500,
                  }}
                >
                  We are still tuning the product and would love to help. Join
                  our beta to help contribute to the future of automating cold
                  emailing.
                </p>
              </div>
              <div
                style={{
                  width: "1px",
                  backgroundColor: colors.light200,
                  height: "60vh",
                }}
                className="absolute hidden z-50 place-self-center md:flex"
              />
              <div className="w-1/2 flex  items-center px-[4vw] sm:w-10/12">
                <Formik
                  initialValues={{ email: "", firstName: "" }}
                  validate={(values) => {
                    let errors: any = {};
                    if (!values.firstName) {
                      errors.firstName = "Required";
                    }
                    if (!values.email) {
                      errors.email = "Required";
                    }
                    if (!validateEmail(values.email)) {
                      errors.email = "Invalid Email";
                    }
                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
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
                    <Form className="flex flex-1 flex-col">
                      <Input
                        labelClass="body-text-xl"
                        placeholder="Milo"
                        label="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        name="firstName"
                        error={errors?.firstName}
                      />
                      <Input
                        labelClass="body-text-xl"
                        label="Email"
                        placeholder="milo@mailpilot.ai"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        name="email"
                        error={errors?.email}
                      />
                      <Button
                        title="Join Beta"
                        preset="primary"
                        cursor={false}
                        onPress={() => {
                          setButtonLoading(true);
                          setTimeout(() => {
                            addToast({
                              appearance: "success",
                              title: "Applied to be a Beta User.",
                              message: "Check your inbox for more information.",
                            });
                            setOpen(false);
                            setButtonLoading(false);
                          }, 1000);
                        }}
                        loading={buttonLoading}
                        disabled={
                          !isValid ||
                          !values.email.length ||
                          !values.firstName.length
                        }
                      />
                      <p
                        className="text-center mt-2 text-light-300"
                        style={{ fontSize: "14px", fontWeight: 500 }}
                      >
                        By signing up, you agree to our{" "}
                        <span className=" text-primary">Terms</span> and{" "}
                        <span className="text-primary">Privacy Policy</span>.
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
