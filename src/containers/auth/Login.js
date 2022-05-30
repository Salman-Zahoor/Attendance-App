import React,{useState} from "react"
import { View ,Text,TextInput,StyleSheet,TouchableOpacity,Image,ScrollView} from "react-native"
import Button from "../../components/Button"
import Header from "../../components/Header"
import { headerbackground, marginTop, vh, vw } from "../../constants"
import facebook from "../../../assets/facebook.png"
import logo from "../../../assets/logo.png"
import firebase from 'firebase';
import axios from "axios"
import * as Facebook from "expo-facebook"
const Login=(props)=>{
    const [inputs,setInputs]=useState({
        email:"",
        password:""
    })

    const onChangeHandler = (type, value) => {
        setInputs({
            ...inputs,
            [type]: value
        })
    }

    const loginUser = () => {
        firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password)

        .then(respone =>{
            console.log(respone,"LOGINNN");

        })
        .catch(errr =>{
            alert(errr.message)
            console.log(errr,"ERRRRRRRRRR");
        })
    }


    
    let permissions = ['public_profile', 'email']


    const loginUserWithFb = async () => {
       
        try {
            await Facebook.initializeAsync({
                appId: "376469961005888"
            });

            let result = await Facebook.logInWithReadPermissionsAsync({ permissions })
            const res = await axios.get('https://graph.facebook.com/v2.5/me?fields=picture.width(720).height(720),email,name,friends&access_token=' + result.token)
                .then(res => {
                    console.log("FAcebook success", res.data);
                })
                .catch(err => {
                    console.log(err, "ERR");
                })


            let response = firebase.auth.FacebookAuthProvider.credential(result.token)

            try {

                const result = firebase.auth().signInWithCredential(response)
                console.log(result, "resultFirebase");
                result.then((res) => {
                    console.log(res, "resResult");
                    let id = res.user.uid
                    firebase.database().ref(`users/${id}`)
                        .set({
                            name: res.additionalUserInfo.profile.name,
                            email: res.additionalUserInfo.profile.email,
                            image: res.additionalUserInfo.profile.picture.data.url,
                            uuid:id
                        }).then((res) => {

                        }).catch((err) => {
                            // console.log(err, "ERRRRRRRRRRR");
                        })
                })
                return result


            } catch (error) {
                console.log(error, "ERRRRRRRRRRRRRRR");
            }
        }
        catch (err) {
            console.log(err, "errrr");
        }
    }
    
const renderTextInputs=(placeholder,type,secureTextEntry)=>{
    return(
        <TextInput
        style={styles.textinputs}
        placeholder={placeholder}
        value={inputs[type]}
        onChangeText={(text)=>onChangeHandler(type,text)}
        secureTextEntry={secureTextEntry}
        />
    )
}


    return(
        <View style={{flex:1}}>
            <Header heading="SignIn"/>
            <ScrollView keyboardShouldPersistTap="handled">
            <View style={styles.mainheading}>
            <Image style={styles.image} source={logo}/>
                <Text style={styles.mainheadingText1}>
               Welcome Back to Attendence App
                </Text>
                <Text style={styles.mainheadingText}>
                    SignIn to  Continue
                </Text>
            </View>
            {renderTextInputs("Email","email",false)}
            {renderTextInputs("Password","password",true)}

            <TouchableOpacity onPress={()=>props.navigation.navigate("Register")}>
                <Text style={styles.touchableText}>Don't Have account?Register</Text>
            </TouchableOpacity>
            <View style={styles.button}>
            <Button heading="SIgnIn" onPress={loginUser} color={headerbackground}/>
            </View>
            <View style={styles.button}>            
            <Button heading="SignIn with facebook" imageUri={facebook} onPress={loginUserWithFb} color="#3b5998"/>
            </View>
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    textinputs:{
        height:vh*0.05,
        paddingHorizontal:10,
        borderBottomWidth:0.5,
        margin:10,
        borderRadius:10,
        borderColor:"black"
    },
    touchableText:{
        textAlign:"center"
    },
    button:{
        marginTop:10
    },
    mainheading:{
        alignItems:"center",
        justifyContent:"center"
    },
    mainheadingText1:{
        fontSize:20,
        fontWeight:"bold",
        color:"black",
    },
    mainheadingText:{
        fontSize:16,
        color:"black"
    },
    image:{
        height:100,
        width:100,
        marginTop:vh*0.06,
    }


})
export default Login