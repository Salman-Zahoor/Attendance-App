import { createStackNavigator } from '@react-navigation/stack';
import { Admin,History} from '../../containers/admin';
import Conversation from '../../containers/admin/chat/Conversation';
import ChatNow from '../../containers/admin/chat/chatNow';
import AdminTab from "../tab/AdminTab"

const Stack = createStackNavigator();

function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminTab" component={AdminTab} options={{headerShown:false}}/>
      <Stack.Screen name="History" component={History} options={{headerShown:false}}/>
      <Stack.Screen name="ChatNow" component={ChatNow} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default AdminStack