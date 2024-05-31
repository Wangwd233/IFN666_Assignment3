import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen'; 
import AboutScreen from './AboutScreen';
import SettingsScreen from './SettingsScreen';
import PetsScreen from './PetsScreen';
import AddPetScreen from './AddPetScreen';
import UpdatePetScreen from './UpdatePetScreen';
import FeedPetScreen from './FeedPetScreen';
import { SettingsProvider } from './components/SettingsContext';
import { AuthContext, AuthProvider } from './components/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

 // Create Home stack
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name=" " component={HomeScreen} options={userOptions} />
    </Stack.Navigator>
  );
}

 // Create Login stack
// function LoginStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="LoginScreen" component={LoginScreen} />
//     </Stack.Navigator>
//   );
// }

// Create About stack
function AboutStack() { 
  return (
    <Stack.Navigator>
      <Stack.Screen name=" " component={AboutScreen} options={userOptions}/>
    </Stack.Navigator>
  );
}

// Create Settings stack
function SettingsStack() {  
  return (
    <Stack.Navigator>
      <Stack.Screen name=" " component={SettingsScreen} options={userOptions} />
    </Stack.Navigator>
  );
}

const userOptions = ({ navigation }) => {
  const { username, logout } = useContext(AuthContext);

  return {
    headerRight: () => (
      <View style={styles.headerRight}>
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    ),
  };
};

function MainTabNavigator() {
  return (
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
      {/* <Tab.Screen 
        name="Login" 
        component={LoginStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="login" color={color} size={size} />
          ),
        }} 
      /> */}
      <Tab.Screen 
        name="About" 
        component={AboutStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="info" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const [isReady, setIsReady] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

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
          <Stack.Navigator>
            {isLoggedIn ? (
                  <>
                    <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="PetsScreen" component={PetsScreen} options={{ headerShown: true }} />
                    <Stack.Screen name="AddPetScreen" component={AddPetScreen} options={{ headerShown: true }} />
                    <Stack.Screen name="UpdatePetScreen" component={UpdatePetScreen} options={{ headerShown: true }} />
                    <Stack.Screen name="FeedPetScreen" component={FeedPetScreen} options={{ headerShown: true }} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                  </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
      </SettingsProvider>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  username: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});