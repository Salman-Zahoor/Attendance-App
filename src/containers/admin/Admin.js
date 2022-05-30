import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Image, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Header, ButtonAdmin } from "../../components"
import { marginTop, vh, vw, headerfont, globaltextcolor,headerbackground } from "../../constants"
import { FontAwesome5 } from '@expo/vector-icons';
import splash from "../../../assets/chat.png"
import firebase from "firebase";

const Admin = (props) => {
    const [array, setArray] = useState([])

    useEffect(() => {
        // let tempArray = []
        // let id = firebase.auth().currentUser.uid
        firebase.database().ref('users')
            .on("value", snapshot => {
                let data=snapshot.val()?snapshot.val():{}
                setArray(data)
            })
    }, [])

    let Data = Object.keys(array)
    console.log(Data, 'DATAAAAAAAa');
const logout=()=>{
    firebase.auth().signOut()
}
    return (
        <View style={styles.mainView}>
            <Header heading="Admin" />
            {Data.length>0 ? Data.map(valuess => {
                if(valuess != firebase.auth().currentUser.uid){
                return (
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("History", {
                        activeKey:valuess,
                        data: array[valuess]
                    })}>
                        <View style={styles.cardview}>
                             {array[valuess].image ? <Image source={{uri:array[valuess].image}} style={{height:40,width:40,borderRadius:30}}/>
                                :
                            <FontAwesome5 name="user-alt" size={20} color="white" style={styles.icon} />}
                            <Text style={styles.text}>
                                {array[valuess].name}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
                }
            })
        :
        <View style={{flex:1,marginVertical:vh*0.4}}>
        <Text style={{textAlign:"center"}}>
            No Users found
        </Text>
        </View>
        }
           
        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    icon: {
        padding: 10,
    },
    cardview: {
        marginTop: vh * 0.03,
        marginHorizontal: vw * 0.07,
        borderRadius: 10,
        padding: 10,
        backgroundColor: headerbackground,
        // borderColor:"#25D366"
        flexDirection: "row",
        elevation:10,
    },
    text: {
        color: globaltextcolor,
        fontSize: headerfont,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10
    },
    buttonsView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    }
})

export default Admin