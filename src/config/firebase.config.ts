import { cert, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const firebaseConfig = require("../../meltrip-prod.json");

const app = initializeApp({
  credential: cert(firebaseConfig),
});

export const storage = getStorage(app).bucket("gs://meltrip-prod.appspot.com");
