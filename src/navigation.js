import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen/index'
import TaskCreationScreen from './screens/TaskCreationScreen/index'
import TaskEditingScreen from './screens/TaskEditingScreen/index'

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="HomeScreen"   
        component={HomeScreen} 
       />
      <Stack.Screen 
        name="TaskCreationScreen" 
        component={TaskCreationScreen}
        />
      <Stack.Screen 
        name="TaskEditingScreen" 
        component={TaskEditingScreen}
      />
    </Stack.Navigator>
  );
}