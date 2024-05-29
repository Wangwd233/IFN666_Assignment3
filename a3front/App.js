import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import AboutScreen from './AboutScreen';
import SettingsScreen from './SettingsScreen';
import { SettingsProvider } from './components/SettingsContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

 // Create Home stack
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

 // Create Login stack
function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

// Create About stack
function AboutStack() { 
  return (
    <Stack.Navigator>
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
    </Stack.Navigator>
  );
}

// Create Settings stack
function SettingsStack() {  
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate loading resources
    setTimeout(() => {
      setIsReady(true);
    }, 2000); // Adjust the timeout duration as needed
  }, []);

  if (!isReady) {
    return (
      <View style={styles.splashContainer}>
        <ImageBackground source={require('./assets/splash.png')} style={styles.background}>
          <ActivityIndicator size="large" color="#0000ff" />
        </ImageBackground>
      </View>
    );
  }

  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
      <SettingsProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen 
              name="Home" 
              component={HomeStack} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="home" color={color} size={size} />
                ),
              }} 
            />
            <Tab.Screen 
              name="Login" 
              component={LoginStack} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="login" color={color} size={size} />
                ),
              }} 
            />
            <Tab.Screen  // Add About tab
              name="About" 
              component={AboutStack} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="info" color={color} size={size} />
                ),
              }} 
            />
            <Tab.Screen  // Add Settings tab
              name="SettingsTab" 
              component={SettingsStack} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="settings" color={color} size={size} />
                ),
              }} 
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SettingsProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for readability
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});