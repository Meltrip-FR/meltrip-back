require("dotenv").config();
import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const firebaseConfig = {
  apiKey: process.env.FBASE_API_KEY,
  authDomain: process.env.FBASE_AUTH_DOMAIN,
  projectId: process.env.FBASE_PROJECT_ID,
  storageBucket: process.env.FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FBASE_MESSAGING_SENDER_ID,
  appId: process.env.FBASE_APP_ID,
  measurementId: process.env.FBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app).bucket("gs://meltrip-prod.appspot.com");
