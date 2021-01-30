import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen'

const Stack = createStackNavigator();
const AppSecondary = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="CameraScreen" component={CameraScreen} />
        </Stack.Navigator>

    );
}
export default AppSecondary;
