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

export const AboutScreen = () => {
  const { startLoader, stopLoader } = useLoader();
  const router = useRouter();
  const { step } = router.query;
  const auth = firebase.auth();

  return (
    <ToggleFullScreen>
      <br />
      <h1 className="h6 text-center my-2">Terms and Conditions</h1>
      <br />

      <p>
        Welcome to MailPilot! These terms and conditions ("Terms") govern your
        use of the MailPilot automated personalized cold emailing platform
        ("Platform"). By using the Platform, you agree to be bound by these
        Terms. If you do not agree with these Terms, please do not use the
        Platform.
      </p>
      <br/>
      <h2 className="text-lg font-semibold">Platform Description</h2>
      <br/>

      <p>
        MailPilot is an AI-powered platform that generates personalized outreach
        emails using data extracted from websites and fed into the application
        in the form of a CSV file. The Platform utilizes Chat GPT technology to
        compose email content based on user data, including profession, company
        information, and other relevant details.
      </p>

      <br/>
      <h2 className="text-lg font-semibold">User Responsibilities</h2>
      <br/>

      <ol>
        <li>
          You are responsible for providing accurate and legitimate data in the
          CSV file.
        </li>
        <li>
          You agree not to use the Platform for any illegal, unauthorized, or
          unethical purposes.
        </li>
        <li>
          You shall not attempt to reverse-engineer, modify, or interfere with
          the Platform's functionality in any way.
        </li>

      </ol>
      <br/>
      <h2 className="text-lg font-semibold">Email Account Passwords</h2>
      <br/>

      <ol>
        <li>
          The Platform does not store your email account passwords on its
          servers or databases.
        </li>
        <li>
          Your email account passwords are saved locally in your browser's local
          storage and are cleared upon session termination.
        </li>

      </ol>

      <br/>
      <h2 className="text-lg font-semibold">Intellectual Property</h2>
      <br/>

      <p>
        All intellectual property rights related to MailPilot, including but not
        limited to software, algorithms, and generated content, remain the sole
        property of the Platform's owners and licensors.
      </p>

      <br/>
      <h2 className="text-lg font-semibold">User-Generated Content</h2>
      <br/>

      <ol>
        <li>
          By using the Platform, you grant us a non-exclusive, worldwide,
          royalty-free license to use, reproduce, modify, adapt, and publish the
          content you provide, solely for the purpose of generating personalized
          emails.
        </li>
        <li>
          You represent and warrant that you have the necessary rights to grant
          us this license.
        </li>
      </ol>

      <br/>
      <h2 className="text-lg font-semibold">Limitation of Liability</h2>
      <br/>

      <ol>
        <li>
          The Platform is provided on an "as-is" basis. We make no warranties,
          express or implied, regarding the Platform's accuracy, reliability, or
          fitness for a particular purpose.
        </li>
        <li>
          We shall not be liable for any direct, indirect, incidental,
          consequential, or punitive damages arising out of or in connection
          with the use of the Platform.
        </li>
      </ol>


      <br/>
      <h2 className="text-lg font-semibold">Indemnification</h2>
      <br/>

      <p>
        You agree to indemnify, defend, and hold harmless the Platform's owners,
        licensors, and their respective officers, directors, employees, and
        agents from and against any claims, liabilities, damages, losses, and
        expenses, including attorneys' fees, arising out of your use of the
        Platform or any violation of these Terms.
      </p>



      <br/>
      <h2 className="text-lg font-semibold">Termination</h2>
      <br/>
      

      <p>
        We reserve the right to terminate your access to the Platform at any
        time and for any reason without prior notice.
      </p>



      <br/>
      <h2 className="text-lg font-semibold">Governing Law and Jurisdiction</h2>
      <br/>

      <p>
        These Terms shall be governed by and construed in accordance with the
        laws of Luxembourg. Any legal action or proceeding arising out
        of or relating to these Terms shall be brought exclusively in the courts
        located in Luxembourg, and you hereby consent to the
        personal jurisdiction of such courts.
      </p>
      <br/>

      <p className=" text-light-300">Last updated: 29 July 2023</p>
    </ToggleFullScreen>
  );
};

export default AboutScreen;
