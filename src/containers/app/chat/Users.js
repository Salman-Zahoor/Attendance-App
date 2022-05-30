import React from "react";
import { Image, View, Text, TouchableOpacity,TouchableWithoutFeedback } from "react-native";
// import { Card, CardItem, Left, Body, Thumbnail } from "native-base";
import styles from "./styles";

const ShowUsers = ({ name, img, onImgTap, onNameTap }) => {
    // alert(img)
    console.log(name,img,'GGG');
    return (
        <TouchableWithoutFeedback onPress={onNameTap}>
            <View>
        <View style={styles.cardStyle}>
            <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                <View>
                    <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
                        {img ? (
                            <Image source={{ uri: img }} style={{
                                height: 50,
                                width: 50,
                                borderRadius: 30,
                            }} resizeMode="cover" />
                        ) : (
                            <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.profileName} onPress={onNameTap}>
                        {name}
                    </Text>
                </View>
            </View>
        </View>
        </View>
        </TouchableWithoutFeedback>
    );
};

export default ShowUsers;
