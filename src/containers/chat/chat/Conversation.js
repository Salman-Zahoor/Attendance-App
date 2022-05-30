import React, { useState, useEffect } from 'react'
import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import firebase from 'firebase'
import ShowUsers from "../chat/Users"
import { BackButton } from '../../components'
// import Profile from '../Reuseable/profile'
// import ShowUsers from '../Reuseable/showUsers'



// const ActiveUserId = firebase.auth().currentUser.uid
const Conversation = ({ navigation }) => {

    const [userDetails, setuserDetails] = useState({
        id: '',
        name: '',
        profileImg: '',
    })
    const { name, profileImg } = userDetails
    const [allUsers, setallUsers] = useState([])
    const [laoder, setLoader] = useState(true)

    useEffect(() => {
        try {
            firebase.database().ref('employee').on('value', (datasnapShot) => {
                let users = [];
                let currentUser = {
                    id: '',
                    name: '',
                    profileImg: ''
                }
                datasnapShot.forEach((child) => {
                    console.log(child, "childchildchild");
                    if (firebase.auth().currentUser.uid === child.val().uuid) {
                        console.log('if')
                        currentUser.id = child.val().uuid;
                        currentUser.name = child.val().name;
                        currentUser.profileImg = child.val().image;
                    }
                    else {
                        console.log('else')
                        users.push({
                            id: child.val().uuid,
                            name: child.val().fName,
                            profileImg: child.val().image,
                            fcm: child.val().token
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
        navigation.navigate("userImage", { profileImg, name })
    }
    const ActiveUserId = firebase.auth().currentUser.uid

    const onNameTap = (profileImg, name, guestId, fcm) => {
        console.log(profileImg, name, guestId,fcm, "THINGSSSSSSSSSSSSSSSSSS");
        navigation.navigate("ChatNow", { profileImg, name, guestId, ActiveUserId, fcm })
    }

    console.log(allUsers, "USSSSSSSSSSSSS");

    return (
        <SafeAreaView style={{ backgroundColor: '#355C7D', flex: 1 }}>
            {laoder == false ?
                <FlatList
                    alwaysBounceVertical={false}
                    data={allUsers}
                    keyExtractor={(_, index) => index.toString()}
                    ListHeaderComponent={
                        // <Profile
                        //     img={profileImg}
                        //     name={name}
                        //     onImgTap={() => onImgTap(profileImg, name)}
                        // />
                        <BackButton navigation={navigation} show heading="All Employees" color="white" />
                    }
                    renderItem={({ item }) =>
                    (
                        <ShowUsers
                            name={item.name}
                            img={item.profileImg}
                            onImgTap={() => onImgTap(item.profileImg, item.name)}
                            onNameTap={() => onNameTap(item.profileImg, item.name, item.id, item.fcm)}

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