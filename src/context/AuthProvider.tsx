import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase/BaseConfig";
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, } from "firebase/auth";
import { db } from "../firebase/BaseConfig";
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { UserProfile, Props } from "../interfaces/interfaces";

// interface AuthDataContextType {
//   logInUserProfile: UserProfile | undefined,
//   users: UserProfile[],
// }

type UserType = User | null;

interface AuthContextType {
  createUser: (email: string, password: string) => Promise<UserCredential>,
  loginUser: (email: string, password: string) => Promise<UserCredential>,
  logOut: () => Promise<void>,
  currentUser: UserType,
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  logInUserProfile: UserProfile | undefined,
  users: UserProfile[],
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<UserType>(null); //email, password, uid
  const [loading, setLoading] = useState<boolean>(true);
  const [logInUserProfile, setLogInUserProfile] = useState<UserProfile>();
  const [users, setUsers] = useState<UserProfile[]>([]);

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Watch if an user is signed in or out
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);

      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  //Obtain data from firebase
  // useEffect(() => {
  //   async function getUsers() {
  //     const q = query(collection(db, "users"));
  //     const querySnapshot = await getDocs(q);
  //     const usersData: UserProfile[] = querySnapshot.docs.map((doc) => ({
  //       ...(doc.data() as UserProfile),
  //     }));
  //     setUsers(usersData);
  //     const currentLogInUser: UserProfile | undefined = usersData.find(user => user.uid === currentUser?.uid)
  //   setLogInUserProfile(currentLogInUser)


  //   }
  //   getUsers();
  // }, [currentUser]);

  const dataCollectionRef = collection(db, 'users')
  useEffect(() => {
    // Create a function to handle updates and unsubscribe from the listener when the component unmounts
    const unsubscribe = onSnapshot(dataCollectionRef, (snapshot) => {
      // Process the data from the Firestore snapshot
      const newData: UserProfile[] = snapshot.docs.map((doc) => doc.data() as UserProfile);
      // Update the component state with the new data
      setUsers(newData);


      // setUsers((prevData) => [...prevData, ...newData]);
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // The empty dependency array ensures the effect runs only once
  // const currentLogInUser: UserProfile | undefined = users.find(user => user.uid === currentUser?.uid)
  // setLogInUserProfile(currentLogInUser)
  
  // const currentLogInUser: UserProfile | undefined = users.find(user => user.uid === currentUser?.uid)
  
  useEffect(() => {
    const currentLogInUser: UserProfile | undefined = users.find(user => user.uid === currentUser?.uid)
    setLogInUserProfile(currentLogInUser)
  }, [users])
  // console.log(logInUserProfile)


  const authValue = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    createUser,
    loginUser,
    logOut,
    logInUserProfile,
    users,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
// const AuthContext = createContext<AuthContextType>(null!);

// export function AuthProvider({ children }: Props) {
//   const [currentUser, setCurrentUser] = useState<UserType>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const createUser = (email: string, password: string) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const loginUser = (email: string, password: string) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {

//       if (user) {
//         setCurrentUser(user);
//         setLoading(false);
//       } else {
//         setCurrentUser(null);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   const authValue = {
//     currentUser,
//     setCurrentUser,
//     loading,
//     setLoading,
//     createUser,
//     loginUser,
//     logOut,
//   };

//   return (
//     <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
