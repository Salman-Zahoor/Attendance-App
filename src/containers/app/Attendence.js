import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native"
import { Header, Button } from "../../components"
import { headerbackground, marginTop, vh } from "../../constants"
import splash from "../../../assets/whatsapp.png"
import firebase from "firebase"
import moment from "moment"
import gmail from "../../../assets/gmail.png"




const markAttendance = () => {
    let id = firebase.auth().currentUser.uid
    firebase.database().ref(`UserHistory/${id}`)
        .push({
            checkInDay: moment(new Date).format("MM-DD-YYYY"),
            checkInTime: moment(new Date).format("hh:mm a"),
            checkouttime: ""
        })
        .then(response => {
            alert("Attendance Marked");
        })
        .catch(eror => {
            console.log(eror, "EERRREERRR");
        })
}



const checkout = (key) => {
    let id = firebase.auth().currentUser.uid
    firebase.database().ref(`UserHistory/${id}/${key}`).once("value", snapshot => {
        if (snapshot?.val()?.checkouttime == "") {
            firebase.database().ref(`UserHistory/${id}/${key}`)
                .update({
                    checkouttime: moment(new Date).format("hh:mm a")
                })
                .then(res => {
                    alert("Successfully checked out")
                })
                .catch(err => {
                    alert("Err")
                })
        }
        else {
            alert("already checkout on this day")
        }
    })
}


const initiateWhatsAppSMS = () => {
    let url =
        'whatsapp://send?text=' + "I want Leave for today" + '&phone=923042023423';
    Linking.openURL(url)
        .then((data) => {
            console.log('WhatsApp Opened');
        })
        .catch(() => {
            alert('Make sure Whatsapp installed on your device');
        });
};

const initializeEmail=()=>{
    Linking.openURL('mailto:admin@admin.com?subject=Leave&body=I want leave for one day')
}

const Attendence = () => {

    const [object, setObject] = useState({})
    useEffect(() => {
        let id = firebase.auth().currentUser.uid
        firebase.database().ref(`UserHistory/${id}`)
            .on("value", snapshot => {
                let data = snapshot.val() ? snapshot.val() : {}
                setObject(data)
            })

    }, [])
    console.log(object, "object");

    let Data = Object.keys(object)
    console.log(Data, 'DATAAAAa');

    const renderButton = () => {
        let isMarked = Data.find(item => object[item].checkInDay == moment(new Date()).format("MM-DD-YYYY"))
        console.log(isMarked, "USSS");
        if (isMarked) {
            return (
                <Button heading="Mark Your Checkout" onPress={() => checkout(isMarked)} color={headerbackground} />
            )
        }
        return (
            <Button heading="Mark Your Attendance" onPress={markAttendance} color={headerbackground} />
        )
    }

    const rendercheckout = () => {
        return (
            <Button heading="Mark Your Checkout" onPress={checkout} color={headerbackground} />
        )
    }

    return (
        <View style={styles.mainView}>
            <Header heading="Attendance" />
            <View style={styles.buttonView}>
                <View>
                    <Text style={{ textAlign: "center", marginBottom: 10, color: headerbackground, fontSize: 18 }}>
                        Mark Attendance Here
                    </Text>
                </View>


                {renderButton()}
            </View>
            <View style={styles.buttonView}>
                <View>
                    <Text style={{ textAlign: "center", marginBottom: 10, color: headerbackground, fontSize: 18 }}>
                        Leave messege to Admin
                    </Text>
                </View>
                <Button heading="Leave messege to Admin" imageUri={splash} onPress={initiateWhatsAppSMS} color="#25D366" />

            </View>
            <View style={styles.buttonView}>
                <View>
                    <Text style={{ textAlign: "center",  marginBottom: 10, color: headerbackground, fontSize: 18, }}>
                        Leave email to Admin
                    </Text>
                </View>
                <Button heading="Leave email to admin" imageUri={gmail} onPress={initializeEmail} color="#ff9800" />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    buttonView: {
        marginTop: vh * 0.1,
    }
})
export default Attendence