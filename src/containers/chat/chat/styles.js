import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: "grey",
    borderBottomWidth: 1,
    marginHorizontal:10,
    borderRadius:10,
    borderColor: "green",
    marginTop:5,
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
    backgroundColor: "grey",
  },
  thumbnailName: { fontSize: 15, color: "white", fontWeight: "bold" },
  profileName: { fontSize: 20, color: "white", fontWeight: "bold",marginLeft:10 },
});
