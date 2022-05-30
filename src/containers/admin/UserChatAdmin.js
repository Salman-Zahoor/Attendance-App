import React from "react";
import { TouchableOpacity,Text,View,StyleSheet,Image,TouchableWithoutFeedback } from "react-native";
import { Header } from "../../components";
import { headerfont, marginTop,vh,vw } from "../../constants";

const UserChatAdmin=(props)=>{
    const [array, setArray] = useState([])

    useEffect(() => {
        // let tempArray = []
        // let id = firebase.auth().currentUser.uid
        firebase.database().ref('users')
            .on("value", snapshot => {
                setArray(snapshot.val())
                // console.log(array,"details");
            })
    }, [])

    let Data = Object.keys(array)
    console.log(Data, 'DATAAAAAAAa');

    return(
        <View style={styles.mainView}>
            <Header heading="Chats"/>
            <ScrollView>
            {Data.map(valuess => {
                if(valuess != firebase.auth().currentUser.uid){
                return (
        <TouchableWithoutFeedback onPress={()=>props.navigation.navigate("Chat")}>
            <View style={styles.touhableview}>
            <Image source={require("../../../assets/salman.jpg")} style={styles.image}/>
            <Text style={styles.text}>{array[valuess].name}</Text>
            </View>
        </TouchableWithoutFeedback>
         )}
        })}
       </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    mainView:{
        flex:1,
        marginTop:marginTop,
    },

    touhableview:{
        flexDirection:"row",
        marginTop:vh*0.02,
        alignItems:"center",
        borderBottomWidth:1,
        borderColor:"#808080"
    },
    image:{
        height:70,
        width:70,
        borderRadius:50,
    },
    text:{
        fontSize:headerfont,
        marginHorizontal:vh*0.01,
        fontWeight:"bold",
    }

})

export default UserChatAdmin