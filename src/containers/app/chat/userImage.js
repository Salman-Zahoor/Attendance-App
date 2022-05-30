import React, { useLayoutEffect } from 'react'
import { View, Text, Image, Dimensions, SafeAreaView } from 'react-native'
import { BackButton } from "../../components"
const win = Dimensions.get('window')

const showFullImg = ({ route, navigation }) => {
    const { params } = route
    const { name, profileImg } = params

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: <Text>{name}</Text>
        })
    }, [navigation])

    return (
        <SafeAreaView style={{ flex: 2 }}>
            <BackButton color="white" heading={name} show navigation={navigation} />
            <Image
                source={{ uri: profileImg }}
                style={{ flex: 1, width: win.width, height: win.height }}
                resizeMode="contain"
            />

        </SafeAreaView>
    )
}

export default showFullImg
