import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation';
import firebase from 'firebase';
import React,{useEffect} from "react"



export default function App() {
  useEffect(() =>{
    const firebaseConfig = {
      apiKey: "AIzaSyBvPvpKkd7BW85N9RtyWF9hMgUqZNZ3J3c",
    authDomain: "attendance-app-4226c.firebaseapp.com",
    databaseURL: "https://attendance-app-4226c-default-rtdb.firebaseio.com",
    projectId: "attendance-app-4226c",
    storageBucket: "attendance-app-4226c.appspot.com",
    messagingSenderId: "377554003384",
    appId: "1:377554003384:web:3c32ae7b396aed1d5e9b4d",
    measurementId: "G-N1HB9K2F40"
    };
  firebase.initializeApp(firebaseConfig); 
  },[])
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
