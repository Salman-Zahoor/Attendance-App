import React ,{useEffect, useState}from "react"
import {View,Text,StyleSheet,ScrollView} from "react-native"
import { Appearance } from "react-native-web"
import {Header} from "../../components"
import{marginTop, vh, vw,headerfont,globaltextcolor, headerbackground}from"../../constants"
import firebase from "firebase"
import arrow from "../../../assets/arraw.png"

const History =({route,navigation})=>{
    const [array, setArray] = useState([])
    useEffect(()=>{
        getUserDetails()
    },[])

  const user=  route.params
  const abc = user.activeKey
  const name = user.data.name
    console.log(abc,"abc");
  console.log(user,"uSER PARAMSSSSS");
console.log(name,"name");

const getUserDetails=()=>{
    let tempArray=[]
    firebase.database().ref(`UserHistory/${abc}`)
    .on("value",snapshotttt =>{
        console.log(snapshotttt,"snapshot");
        snapshotttt.forEach(innerval=>{
           
           tempArray.push(innerval.val())
        })
        setArray(tempArray)
    })
   
}
// console.log(array,"array");
// console.log(valuees,"valuesss");

    return(
        <View  style={styles.mainView}>
            <Header heading={name+" History"} imageUri={arrow} onPress={()=>navigation.navigate("Admin")}/>
            <ScrollView>
            {array.length >0 ? array.map(valuess =>{
                return(
            <View style={styles.cardview}>
                <Text style={styles.text}>
                Date : {valuess.checkInDay}
            </Text>
            <Text style={styles.text}>
                Chech In : {valuess.checkInTime}
            </Text>
            <Text style={styles.text}>
                Check Out : {valuess.checkouttime}
            </Text>
            </View>
            )
            })
            :
            <View style={{flex:1,marginVertical:vh*0.4}}>
                <Text style={{textAlign:"center"}}>
                    No user history found
                </Text>
                </View>
            }
            </ScrollView>
        </View>
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

export default History