import React,{useState,useEffect} from "react"
import {View,Text,StyleSheet,ScrollView} from "react-native"
import {Header} from "../../components"
import{marginTop, vh, vw,headerfont,globaltextcolor, headerbackground}from"../../constants"
import firebase from "firebase"

const UserHistory =()=>{
    useEffect(()=>{
        getUserHistory()
        
    },[]);
    const[userHistory,setUserHistory]=useState([])

    const getUserHistory=()=>{
        let id=firebase.auth().currentUser.uid
        firebase.database().ref(`UserHistory/${id}`)
        .on("value",snapshot=>{
            let data=snapshot.val() ?snapshot.val() : {}
            setUserHistory(data)
        })
    
    }
   

    let keys=Object.keys(userHistory)
    return(
        <>
        
        <View  style={styles.mainView}>
            <Header heading="Attendance History"/>
                
            <ScrollView>
            {keys.length >0 ? keys.map((items,index)=>{
                return(
            <View style={styles.cardview}>
                <Text style={styles.text}>
                Date : {userHistory[items].checkInDay}
            </Text>
            <Text style={styles.text}>
            CheckIn : {userHistory[items].checkInTime}
            </Text>
            <Text style={styles.text}>
            CheckOut : {userHistory[items].checkouttime}
            </Text>
            </View>
            )
            })
        :
        <View style={{ flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:15}}>
                    No Attendance History Available
                </Text>
            </View>
        }
            </ScrollView>
        </View>
        
        </>
    )
}

const styles=StyleSheet.create({
    mainView:{
        flex:1,
    },
    cardview:{
        marginVertical:vh*0.03,
        marginHorizontal:vw*0.07,
        borderRadius:10,
        padding:10,
        backgroundColor:headerbackground,
        elevation:10
    },
    text:{
        color:globaltextcolor,
        fontSize:18,
        fontWeight:"bold"
    }
})

export default UserHistory