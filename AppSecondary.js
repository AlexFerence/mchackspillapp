import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen';


const Stack = createStackNavigator();
const AppSecondary = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>

    );
}
export default AppSecondary;
