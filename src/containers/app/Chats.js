import React from "react"
import {View,TextInput,StyleSheet,KeyboardAvoidingView,Platform,KeyboardAvoidingViewComponent}from "react-native"
import { Header} from "../../components"
import { marginTop,vh} from "../../constants"
import {GiftedChat} from "react-native-gifted-chat"
import arrow from "../../../assets/arraw.png"
import firebase from "firebase"


const Chats=(props)=>{
    const Logout=()=>{
        firebase.auth().signOut()
    }
   

   
    return(
        // <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={190} style={{flex:3}}>
            <View style={styles.mainView}>
        <Header heading="Chats" salman="LOGOUT"  imageUri={arrow} onPress={()=>props.navigation.navigate("UserChat")} Press={Logout}/>
        
        <GiftedChat/>
        {/* <View style={styles.Textinput}>
        <TextInput
        placeholder="Salman"
        />

        
        </View> */}
        </View>
        // </KeyboardAvoidingView>

    )
}

const styles=StyleSheet.create({
    mainView:{
        flex:1,
        marginTop:marginTop,
    },
    Textinput:{
    marginTop:vh*0.75,
    justifyContent:"flex-end",
    height:vh*0.05,
        paddingHorizontal:10,
        borderWidth:1,
        margin:10,
        borderRadius:10,
        borderColor:"black"
    }
})

export default Chats