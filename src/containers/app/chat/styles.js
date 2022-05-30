import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: "white",
    borderBottomWidth:0.5,
    borderRadius:10,
    borderColor:"black",
    marginTop:10,
  },
  cardItemStyle: {
    backgroundColor: "#2F4F4F",
  },

  logoContainer: {
    height: 50,
    width: 50,
    borderColor: "white",
    borderWidth: 1,
    
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  thumbnailName: { fontSize: 15, color: "white", fontWeight: "bold" },
  profileName: { fontSize: 20, color: "black", fontWeight: "bold",marginLeft:10 },
});
