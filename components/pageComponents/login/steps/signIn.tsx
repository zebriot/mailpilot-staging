import React, { useEffect, useState } from "react";
import { colors } from "../../../../styles";
import {
  APP_URL,
  UserConfig,
  authenticateLinkedInCode,
  sendSignInLink,
  validateEmail,
} from "../../../../utils";
import Router, { useRouter } from "next/router";
import { LoginSteps } from "../../../../pages/login";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import Button from "../../../button";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithCustomToken,
} from "firebase/auth";
import { useAppDispatch } from "../../../../redux/store";
import { setUserDetails } from "../../../../redux/slices/steps";
import { useLoader } from "../../../../utils/providers";

export const SignIn = () => {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });
  const router = useRouter();
  const { startLoader, stopLoader } = useLoader();
  const dispatch = useAppDispatch();
  const { code } = router.query;
  useEffect(() => {
    if (code) {
      console.log("CODEEEE", code);
      handleLinkedInCode(code as string);
    }
  }, [code]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isEmailSiginLoading, setEmailSiginLoading] = useState(false);

  const handleLinkedInCode = async (code: string) => {
    startLoader();
    const res = await authenticateLinkedInCode(code);
    dispatch(
      setUserDetails({
        name: res?.name,
        photoUrl: res?.photoUrl,
      } as UserConfig)
    );
    localStorage.setItem("MAILPILOT_linkedIn_name", res?.name);
    localStorage.setItem("MAILPILOT_linkedIn_photoUrl", res?.photoUrl);
    // await updateUser({
    //   name: res?.name,
    //   photoUrl: res?.photoUrl,
    // });
    signInWithCustomToken(auth, res?.customToken);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: "77j7yef5b36hsc",
    redirectUri: `${APP_URL}/login`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      console.log("useLinkedIn", code);
    },
    scope: "r_liteprofile r_emailaddress",
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogin = async () => {
    if (!isValid) return;
    window.localStorage.setItem("emailForSignIn", email);

    try {
      setEmailSiginLoading(true);
      const code = await sendSignInLink(email);

      Router.push({
        pathname: "/login",
        query: { step: LoginSteps.verifyEmail, email, code },
      });
      setEmailSiginLoading(false);
    } catch (error) {
      console.log(error);
      setEmailSiginLoading(false);
    }
  };

  useEffect(() => {
    
    // Confirm the link is a sign-in with email link.
    if (isSignInWithEmailLink(auth, window.location.href)) {
      startLoader()
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }, []);

  //   const handleSignUp = async () => {
  //     try {
  //       await auth.createUserWithEmailAndPassword(email, password);
  //       // Successful sign-up, perform any necessary actions (e.g., redirect)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
    // Perform email validation logic and update `isValid` state accordingly
    if (event.target.value === "") {
      setIsValid(true);
    } else {
      setIsValid(validateEmail(event.target.value));
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    // Perform email validation logic and update `isValid` state accordingly
    // setIsValid(validateEmail(event.target.value));
  };

  return (
    <>
      <div className="content-child-container-pre-login">
        <p className="text-5xl my-12  text-center font-medium">
          💼 Let’s get
          <br />
          you started
        </p>
        <input
          className={`input-default ${!isValid && "invalid"}`}
          style={{ height: "52px" }}
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Email Address"
        />
        {/* <PhoneInput setPhone={setPhone} /> */}
        {/* <input
          className={`input-default ${!isValid && "invalid"}`}
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Phone Number"
        /> */}
        <Button
          disabled={email?.length === 0 || !isValid}
          title="Continue"
          preset="primary"
          containerStyle={{
            width: "100%",
            marginBottom: "20px",
            marginTop: "20px",
          }}
          loading={isEmailSiginLoading}
          onPress={handleLogin}
        />
        {/* <button className="primary-button" onClick={handleLogin}>
          Continue
        </button> */}

        <div className="or-divider-container">
          <div className="or-divider" />
          <p className="text-light mx-5 text-lg">OR</p>
          <div className="or-divider" />
        </div>

        <div className="inline-flex flex-row my-5">
          <button
            className="social-sigin-icon-wrapper"
            onClick={() => auth.signInWithPopup(googleProvider)}
          >
            <img
              src="/svg/google.svg"
              alt="Google"
              className="social-sigin-icon"
            />
          </button>
          <button className="social-sigin-icon-wrapper" onClick={linkedInLogin}>
            <img
              src="/svg/linkedin.svg"
              alt="LinkedIn"
              className="social-sigin-icon"
            />
          </button>
          {/* <button className="social-sigin-icon-wrapper">
            <img
              src="/svg/wallet-connect.svg"
              alt="Wallet Connect"
              className="h-30 w-30"
              // style={{height :'30px',width:'30px' }}
            />
          </button> */}
        </div>

        <p className="text-light">
          By creating an account, you agree to MailPilot’s
          <br />
          <span style={{ color: colors.primary, fontWeight: "600" }}>
            Terms of Services
          </span>{" "}
          and{" "}
          <span style={{ color: colors.primary, fontWeight: "600" }}>
            Privacy Policy
          </span>
          .
        </p>
      </div>
      <p className="text-light">
        Can’t access your account?{" "}
        <span style={{ color: colors.primary, fontWeight: "600" }}>
          Get Help
        </span>
      </p>
    </>
  );
};

export default SignIn;
