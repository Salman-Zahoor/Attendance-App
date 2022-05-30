// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage";
// import { getDatabase, ref as refrence, get,child} from "firebase/database";
// import firebase from "firebase/app"
// import { async } from "@firebase/util";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBvPvpKkd7BW85N9RtyWF9hMgUqZNZ3J3c",
//     authDomain: "attendance-app-4226c.firebaseapp.com",
//     databaseURL: "https://attendance-app-4226c-default-rtdb.firebaseio.com",
//     projectId: "attendance-app-4226c",
//     storageBucket: "attendance-app-4226c.appspot.com",
//     messagingSenderId: "377554003384",
//     appId: "1:377554003384:web:3c32ae7b396aed1d5e9b4d",
//     measurementId: "G-N1HB9K2F40"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const provider = new FacebookAuthProvider();
// const storage=getStorage()
// const db = getDatabase();
// const dbRef = refrence(getDatabase());


// // async function registerUser(email, password, name) {
// //     try {
// //       const userCredential = await createUserWithEmailAndPassword(auth, email, password)
// //       const uid = userCredential.user.uid
// //       await setDoc(doc(db, "users", uid), {
// //         email,
// //         fullname,
// //         phoneNumber
// //       })
// //       alert('Successfully Registered and added in database')
// //     } catch (e) {
// //       alert(e.message)
// //     }
  
// //   }

// const registerUser = (email, password, name) => {
//     console.log(email, "Register");
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             const user = userCredential.user.uid
//             alert("Successfully Registered")
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//             alert(errorMessage)
//             console.log("error", errorMessage, errorCode)
//         })


// }

// const loginUser = async (email, password) => {
//     try {
//         const user = await signInWithEmailAndPassword(auth, email, password)
//         alert("Success")
//     } catch (error) {
//         alert(error.message)
//     }

// }
// const getUserDetails= ()=>{
//     const userId = auth.currentUser.uid;
//     const details=(dbRef, `users/${userId}`)
//     get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//         if (snapshot.exists()) {
//           console.log(snapshot.val());
//         } else {
//           console.log("No data available");
//         }
//       }).catch((error) => {
//         console.error(error);
//       });
      
// }

// const logOut=()=>{
//         signOut(auth)
// }
// const loginWithFacebook = async () => {

//     try {
//         const result = await signInWithPopup(auth, provider)
//         const user = result.user;

//         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//         const credential = FacebookAuthProvider.credentialFromResult(result);
//         const accessToken = credential.accessToken;

//     } catch (error) {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.email;
//         // The AuthCredential type that was used.
//         const credential = FacebookAuthProvider.credentialFromError(error);

//         alert(errorMessage)

//         // ...
//     }

//     // .catch((error) => {
//     //     // Handle Errors here.
//     //     const errorCode = error.code;
//     //     const errorMessage = error.message;
//     //     // The email of the user's account used.
//     //     const email = error.email;
//     //     // The AuthCredential type that was used.
//     //     const credential = FacebookAuthProvider.credentialFromError(error);

//     //     // ...
//     // });
// }
//  async function uploadImagesInStorage(file){
//      const storageRef=ref(storage,`UserProfile/${file.name}`);
//      const response=await uploadBytes(storageRef,file)
//      return await getDownloadURL(response.ref)
//      console.log(response.ref,"response");
//  }

// export {
//     registerUser,
//     loginUser,
//     loginWithFacebook,
//     uploadImagesInStorage,
//     getUserDetails,
//     logOut
// }
