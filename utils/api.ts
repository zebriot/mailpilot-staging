import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { EmailConfig } from "../redux/slices/steps";

const BASE_URL = "http://192.168.29.216:3001";

export const sendSignInLink = async (email: string) => {
  try {
    console.log("sending link to ", email);
    const res = await axios.post(BASE_URL + "/send-signin-link", { email });
    console.log("sendSingInLink : ", res);
    return res.data?.code;
  } catch (err) {
    console.log("sendSingInLink : ERR ", err);
    return "- - - -";
  }
};

export const sendEmail = async ({
  emailConfig,
  toAddress,
  email: { subject, html },
}: {
  emailConfig: EmailConfig;
  toAddress: string;
  email: { subject: string; html: string };
}) => {
  try {
    const res = await axios.post(BASE_URL + "/send-email", {
      host: emailConfig.host,
      port: emailConfig.port,
      from: {
        name: emailConfig.name,
        email: emailConfig.emailAddress,
        password: emailConfig.password,
      },
      email: {
        to: toAddress,
        subject,
        html,
      },
    });
  } catch (err) {}
};
