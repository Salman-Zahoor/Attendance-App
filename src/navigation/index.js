import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, Image } from 'react-native';
import {headerbackground} from "../constants"
import firebase from 'firebase';
import AuthStack from './stack/AuthStack';
import AppStack from './stack/AppStack';
import AdminStack from './stack/AdminStack';

export default function Navigation() {
  const [component, setComponent] =
        useState(
            <ActivityIndicator color={headerbackground} size={"large"}
                style={{ flex: 1 }}
                animating={true}
            />
        )
        useEffect(()=>{
            setTimeout(() =>{
            firebase.auth().onAuthStateChanged(user =>{
                console.log(user,'usseee');
                if(user){
                firebase.database().ref(`users/${user.uid}`).on('value',snapshot=>{
                    console.log(snapshot,'sss');
                    if(snapshot.val().email=='admin@admin.com'){
                        setComponent(<AdminStack/>)
                    }
                    else{
                        setComponent(<AppStack/>)
                    }
                })
            }
            else{
                setComponent(<AuthStack/>)
            }
            })
            },3000);
        },[]) 

  return (
    <NavigationContainer>
            {/* <AuthStack /> */}
            {/* <AppStack /> */}
            {component}
            {/* <AdminStack/> */}
        </NavigationContainer>
    );
}