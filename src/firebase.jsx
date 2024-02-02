import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBGE2jBENyOM7SoccdFSVPcvW8yJjA2J7U",
  authDomain: "react-learner-mentor-app.firebaseapp.com",
  projectId: "react-learner-mentor-app",
  storageBucket: "react-learner-mentor-app.appspot.com",
  messagingSenderId: "572442102923",
  appId: "1:572442102923:web:6a27e928c6620d0825188e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// export const userCollection = collection(db, "users")