import axios from "axios";
import { EmailConfig } from "../redux/slices/steps";

const BASE_URL = "https://mailpilot.ai"; // LIVE AWS
// const BASE_URL = "http://192.168.29.216:3001"; // DEV;

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
  email: { subject, email },
  fromName  
}: {
  emailConfig: EmailConfig;
  toAddress: string;
  email: { subject: string; email: string };
  fromName:string
}) => {
  try {
    console.log("sendEmail  : emailConfig", emailConfig);
    const res = await axios.post(BASE_URL + "/send-email", {
      host: emailConfig.host,
      port: emailConfig.port,
      from: {
        name: fromName,
        email: emailConfig.emailAddress,
        password: emailConfig.password,
      },
      email: {
        to: toAddress,
        subject,
        html: email,
      },
    });
    return res;
  } catch (err) {
    return undefined;
  }
};

export const authenticateLinkedInCode = async (code: string) => {
  try {
    const res = await axios.post(BASE_URL + "/authenticate-linkedin", {
      code,
    });

    return res.data;
  } catch (err) {
    console.log("LINKED IN AUTH FAILED : ");
    return undefined;
  }
};
