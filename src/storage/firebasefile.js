import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQgHDUqVKFAaV3JZldaMDRtKv_m7XFCYo",
  authDomain: "cadeverse.firebaseapp.com",
  projectId: "cadeverse",
  storageBucket: "cadeverse.appspot.com",
  messagingSenderId: "783102527081",
  appId: "1:783102527081:web:3675560eb829df1a9944f8",
  measurementId: "G-WWNJZD98LR",
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export default storage;
