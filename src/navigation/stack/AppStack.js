import { createStackNavigator } from '@react-navigation/stack';
import{Chats}from "../../containers/app"
import Tab from '../tab/Tab';
import ChatNow from '../../containers/app/chat/chatNow';
const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" component={Tab} options={{headerShown:false}}/>
      <Stack.Screen name="ChatNow" component={ChatNow} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default AppStack