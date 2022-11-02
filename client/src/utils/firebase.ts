import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { initializeApp } from "firebase/app";

const {
  REACT_APP_API_KEY,
  REACT_APP_DOMAIN,
  REACT_APP_P_ID,
  REACT_APP_BUCKET,
  REACT_APP_SENDER_ID,
  REACT_APP_A_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_DOMAIN,
  projectId: REACT_APP_P_ID,
  storageBucket: REACT_APP_BUCKET,
  messagingSenderId: REACT_APP_SENDER_ID,
  appId: REACT_APP_A_ID,
};

const app = initializeApp(firebaseConfig);
const storage = () => getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
