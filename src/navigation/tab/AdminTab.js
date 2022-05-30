import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Admin,Profile} from '../../containers/admin';
import Conversation from '../../containers/admin/chat/Conversation';
import { Foundation } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { headerbackground } from '../../constants';


const Tab = createBottomTabNavigator();



function TabBottom() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard:true,
        tabBarActiveBackgroundColor:"black", 
        tabBarInactiveBackgroundColor:headerbackground,
        tabBarActiveTintColor:"black",
        tabBarShowLabel:false,
        
    }}>
      <Tab.Screen name="Admin" component={Admin} options={{headerShown:false,tabBarIcon:()=>(
     <Foundation name="clipboard-pencil" size={24} color="white" />
      ),}} />
      <Tab.Screen name="UserChatAdmin" component={Conversation}  options={{headerShown:false,tabBarIcon:()=>(
        <Entypo name="chat" size={24} color="white" />
        ),}}/>
      <Tab.Screen name="Profile" component={Profile}  options={{headerShown:false,tabBarIcon:()=>(
        <MaterialCommunityIcons name="face-profile" size={24} color="white" />
     ),}}/>
      
    </Tab.Navigator>
  );
}

export default TabBottom