import React, { useLayoutEffect, useState, useEffect } from 'react'
import firebase from 'firebase'
import { View, Text, Image, Dimensions, StyleSheet, SafeAreaView, FlatList, TextInput, ImageBackground } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ChatBox from './ChatBox'
import{ChatHeader}from "../../../components"
import arrow from "../../../../assets/arraw.png"
// import { color, appStyle, globalStyle } from "../utility";
// import InputField from '../Reuseable/FieldInput'
// import ChatBox from '../Reuseable/chatBox'
import { senderMsg, ReceivedMsg } from '../chat/sendMessage'



const win = Dimensions.get('window')

const ChatNow = ({ route, navigation }) => {
    const { params } = route
    const { name, image, ActiveUserId, guestId, fcm } = params
    console.log(image, "NAYYYYYYYYYYYYYYYYYy");
    const [msgValue, setMsgValue] = useState('')
    const [messages, setMessages] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: <Text>{name}</Text>
        })
    }, [navigation])

    useEffect(() => {
        try {
            firebase.database().ref('messages').child(ActiveUserId).child(guestId).on('value', (datasnapshot) => {
                let msg = []
                datasnapshot.forEach((child) => {
                    msg.push({
                        sendBy: child.val().message.sender,
                        ReceivedBy: child.val().message.receiver,
                        msg: child.val().message.msg,
                        img: child.val().message.img
                    })
                })
                setMessages(msg.reverse())
            })

        } catch (error) {
            alert(error)
        }
    }, [])

    // const handleChange = (text) => {
    //     setMsgValue(text)
    // }

    const handleSend = () => {
        if (msgValue) {
            senderMsg(msgValue, ActiveUserId, guestId, '', fcm, name).then(() => {
                setMsgValue('')
            })
                .catch((err) => {
                    setMsgValue('')

                    alert(err)
                })
            ReceivedMsg(msgValue, ActiveUserId, guestId, '').then(() => {
                setMsgValue('')
            })
                .catch((err) => {
                    setMsgValue('')

                    alert(err)
                })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ChatHeader heading={params.name} backbtn={arrow} imageUri={{uri:params.image}} onPress={()=>navigation.navigate("UserChatAdmin")} />

            <View style={{ borderBottomWidth: 1, borderBottomColor: "white" }}>
            </View>
            {/* <ImageBackground
                source={require('../../assets/profile.jpeg')}
                style={{ flex: 1, width: win.width, height: win.height }}
            > */}

            <FlatList
                inverted
                data={messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) =>

                (
                    <ChatBox
                        msg={item.msg}
                        userId={item.sendBy}
                        img={item.img}
                        fcm={fcm}
                    // onImgTap={() => imgTap(item.img)} 
                    />
                )
                }

            />
            <View style={styles.sendMessageContainer}>
                <TextInput
                    placeholder="Type msg here"
                    value={msgValue}
                    onChangeText={(text) => setMsgValue(text)}

                />
                <View style={styles.sendBtnContainer}>
                    {/* <MaterialCommunityIcons
                        name="camera"
                        color={color.WHITE}
                        size={appStyle.fieldHeight}
                        /> */}
                    <MaterialCommunityIcons
                        name="send-circle"
                        color="black"
                        size={50}
                        onPress={() => handleSend()}
                    />
                </View>

            </View>
            {/* </ImageBackground> */}
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    sendMessageContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
        borderTopWidth: 0.5,
        borderColor: "black"
    },
    input: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        width: "90%",
    },

    sendBtnContainer: {
        // height: appStyle.fieldHeight,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        width: "15%",

    },
});

export default ChatNow
