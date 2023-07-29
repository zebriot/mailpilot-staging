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

export const TNC = () => {
  const { startLoader, stopLoader } = useLoader();
  const router = useRouter();
  const { step } = router.query;
  const auth = firebase.auth();

  return (
    <ToggleFullScreen>
      <br />
      <h1 className="h6 text-center my-2">
        About MailPilot - Your Automated Personalized Cold Emailing Platform
      </h1>
      <br />

      <p>
        Welcome to MailPilot, your ultimate solution for automating and
        personalizing cold email outreach! We are an innovative platform that
        harnesses the power of AI to generate personalized and effective emails
        from the data extracted from websites, all conveniently provided to us
        in the form of a CSV file. Our cutting-edge technology integrates Chat
        GPT to create compelling, one-of-a-kind emails tailored specifically to
        each recipient.
      </p>
      <br />

      <h2 className="text-lg font-semibold">How It Works:</h2>
      <br />
      <ol>
        <li>
          <strong>Data-Driven Personalization:</strong>
          <br /> At MailPilot, we understand that personalization is key to
          successful cold email campaigns. Our platform takes advantage of the
          data you provide in the CSV file, including names, professions,
          company information, and more, to craft unique and engaging email
          content. This tailored approach ensures that your recipients feel
          valued and more likely to respond positively.
        </li>
        <br />

        <li>
          <strong>AI-Powered Email Generation:</strong>
          <br />
          Our AI technology, fueled by Chat GPT, takes the personalized data and
          weaves it into high-quality email content that sounds human-written.
          No more generic, soulless templates – MailPilot creates authentic and
          captivating emails that resonate with your audience.
        </li>
        <br />
        <li>
          <strong>User-Friendly Interface:</strong> <br /> Using MailPilot is a
          breeze. Simply upload your CSV file with the relevant data, and our
          platform will do the rest. You can easily review and customize the
          generated emails before sending them out, making the process seamless
          and efficient.
        </li>
        <br />
        <li>
          <strong>Secure Email Account Handling:</strong> <br /> We prioritize
          your privacy and security. MailPilot does not store your email account
          passwords on our servers or databases. Instead, your email account
          passwords are saved locally in your browser's local storage and are
          cleared once your session is over.
        </li>
        <br />
      </ol>

      <p>
        <strong>Your Success is Our Mission:</strong>
      </p>

      <p>
        We are committed to helping you achieve your outreach goals with
        MailPilot. Whether you're a startup founder looking to connect with
        potential investors or a sales professional seeking to engage with
        prospects, our platform is designed to boost your cold email success
        rates.
      </p>
      <br />

      <br />

      <h2 className="text-lg font-semibold">Why Choose MailPilot:</h2>
      <br />

      <ul>
        <li>
          <strong>Time-Saving Automation:</strong> <br /> Say goodbye to manual
          email crafting. With MailPilot, you can automate and streamline your
          outreach efforts, allowing you to focus on other critical aspects of
          your business.
        </li>
        <br />
        <li>
          <strong>Increased Engagement:</strong> <br /> Personalized emails have
          a higher chance of capturing your recipients' attention and fostering
          meaningful connections.
        </li>
        <br />
        <li>
          <strong>Data-Driven Insights:</strong> <br /> MailPilot provides
          valuable insights into email open rates, click-through rates, and
          other performance metrics, enabling you to optimize your campaigns for
          better results.
        </li>
        <br />
        <li>
          <strong>Seamless Integration:</strong> <br /> Our platform seamlessly
          integrates with your existing email service providers, making the
          setup process quick and hassle-free.
        </li>
        <br />
      </ul>
      <br />
      <p>
        <strong>Join MailPilot Today:</strong>
      </p>

      <p>
        Experience the future of cold emailing with MailPilot. Unlock the power
        of AI-driven personalization and elevate your email outreach to new
        heights. Sign up today and watch as MailPilot takes your cold email
        campaigns to the next level!
      </p>

      <p>
        Contact us at{" "}
        <a href="mailto:contact@mailpilot.ai">contact@mailpilot.ai</a> for any
        inquiries or assistance. Let's embark on a journey of successful
        outreach together with MailPilot!
      </p>
      <br />
    </ToggleFullScreen>
  );
};

export default TNC;
