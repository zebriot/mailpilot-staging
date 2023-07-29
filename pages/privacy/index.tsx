import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { checkEmailVerification, firebaseConfig, getUser } from "../../utils";
import { collection, getDocs } from "firebase/firestore/lite";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Image from "next/image";
import "../../styles/login.module.css";
import { colors } from "../../styles";
import { SignIn } from "../../components/pageComponents/login/steps/signIn";
import { VerifyEmail } from "../../components/pageComponents/login/steps/verifyEmail";
import { VerifyPhone } from "../../components/pageComponents/login/steps/verifyPhone";
import { BuildProfile } from "../../components/pageComponents/login/steps/buildProfile";

import { useLoader } from "../../utils/providers";
import { ToggleFullScreen } from "../../components/fullScreenAvailable";

export const PP = () => {
  const { startLoader, stopLoader } = useLoader();
  const router = useRouter();
  const { step } = router.query;
  const auth = firebase.auth();

  return (
    <ToggleFullScreen>
      <br />
      <h1 className="h6 text-center my-2">Privacy Policy</h1>
      <br />

      <p>
        This Privacy Policy explains how we collect, use, and protect your
        personal information when you use <strong>MailPilot</strong>.
        By using the Platform, you consent to the practices described in this
        Privacy Policy.
      </p>

      <br />
      <h2 className="text-lg font-semibold">Information We Collect</h2>
      <br />

      <ol>
        <li>
          We collect the data provided in the CSV file, which may include
          personal information such as names, email addresses, professions, and
          company information.
        </li>
        <li>
          We may collect technical information about your device, browser, and
          usage patterns while using the Platform.
        </li>
      </ol>

      <br />
      <h2 className="text-lg font-semibold">How We Use Your Information</h2>
      <br />

      <ol>
        <li>
          We use the data from the CSV file to generate personalized emails for
          outreach purposes.
        </li>
        <li>
          Your email account passwords are saved locally in your browser's local
          storage solely for the purpose of sending emails from your account
          through the Platform.
        </li>
      </ol>

      <br />
      <h2 className="text-lg font-semibold">Data Security</h2>
      <br />

      <ol>
        <li>
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction.
        </li>
        <li>
          However, please note that no method of transmission over the internet
          or electronic storage is 100% secure. We cannot guarantee the absolute
          security of your data.
        </li>
      </ol>

      <br />
      <h2 className="text-lg font-semibold">Disclosure of Information</h2>
      <br />

      <ol>
        <li>
          We do not sell, trade, or rent your personal information to third
          parties.
        </li>
        <li>
          We may share your information with trusted third-party service
          providers who assist us in operating the Platform, subject to
          confidentiality agreements.
        </li>
      </ol>

      <br />
      <h2 className="text-lg font-semibold">User Choices</h2>
      <br />

      <ol>
        <li>
          You have the right to access, update, and correct the personal
          information you provide in the CSV file.
        </li>
        <li>
          You can discontinue using the Platform and delete your data at any
          time by ceasing to use the Platform.
        </li>
      </ol>

      <br />
      <h2 className="text-lg font-semibold">Updates to the Privacy Policy</h2>
      <br />

      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        effective immediately upon posting the updated Privacy Policy on the
        Platform's website.
      </p>

      <br />
      <h2 className="text-lg font-semibold">Contact Us</h2>
      <br />

      <p>
        If you have any questions or concerns regarding this Privacy Policy or
        your personal information, please contact us at{" "}
        <a href="mailto:contact@mailpilot.ai">contact@mailpilot.com</a>.
      </p>
      <br />

      <p className="text-light-300">Last updated: 29 July 2023</p>
      <br />
    </ToggleFullScreen>
  );
};

export default PP;
