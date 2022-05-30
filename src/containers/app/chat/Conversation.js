import React, { useState, useEffect } from 'react'
import { View, FlatList, SafeAreaView, ActivityIndicator,ScrollView } from 'react-native'
import firebase from 'firebase'
// import Profile from '../Reuseable/profile'
import ShowUsers from './Users'
import Header from "../../../components/Header"



// const ActiveUserId = firebase.auth().currentUser.uid
const Conversation = ({ navigation }) => {

    const [userDetails, setuserDetails] = useState({
        id: '',
        name: '',
        iamge: '',
    })
    const { name, profileImg } = userDetails
    const [allUsers, setallUsers] = useState([])
    const [laoder, setLoader] = useState(true)

    useEffect(() => {
        try {
            firebase.database().ref('users').on('value', (datasnapShot) => {
                let users = [];
                let currentUser = {
                    id: '',
                    name: '',
                    image: ''
                }
                datasnapShot.forEach((child) => {
                    console.log(child, "childchildchild");
                    if (firebase.auth().currentUser.uid === child.val().uuid) {
                        console.log('if')
                        currentUser.id = child.val().uuid;
                        currentUser.name = child.val().name;
                        currentUser.image = child.val().image;
                    }
                    else {
                        console.log('else')
                        users.push({
                            id: child.val().uuid,
                            name: child.val().name,
                            image:child.val().image
                        })
                    }
                })
                setLoader(false)
                setuserDetails(currentUser)
                setallUsers(users)
            })
        } catch (error) {
            console.log(error);
        }
    }, [navigation])

    const onImgTap = (profileImg, name) => {
        // navigation.navigate("userImage", { profileImg, name })
    }
    const ActiveUserId = firebase.auth().currentUser.uid

    const onNameTap = (name, guestId,image) => {
        console.log(image, name, guestId, "THINGSSSSSSSSSSSSSSSSSS");
        navigation.navigate("ChatNow", { name, guestId, ActiveUserId,image})
    }

    console.log(allUsers, "USSSSSSSSSSSSS");

    return (
        
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <Header heading="Chats"/>
            {laoder == false ?
                <FlatList
                    alwaysBounceVertical={false}
                    data={allUsers}
                    keyExtractor={(_, index) => index.toString()}
                    // ListHeaderComponent={
                    //     // <Profile
                    //     //     img={profileImg}
                    //     //     name={name}
                    //     //     onImgTap={() => onImgTap(profileImg, name)}
                    //     // />
                    //     <BackButton navigation={navigation} show heading="All Employees" color="white" />
                    // }
                    renderItem={({ item }) =>
                    (
                        <ShowUsers
                        
                            name={item.name}
                            img={item.image}
                            // onImgTap={() => onImgTap(item.profileImg, item.name)}
                            onNameTap={() => onNameTap(item.name, item.id,item.image)}

                        />
                    )}
                />
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator
                        color="white"
                    />
                </View>}
        </SafeAreaView>
    )
}





export default Conversation