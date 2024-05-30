import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      //create two variable to read user token and user name from local async storage
      const token = await AsyncStorage.getItem('userToken');
      const storedUsername = await AsyncStorage.getItem('username');

      if (token && storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  const login = async (token, username) => {
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('username', username);
    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading, username }}>
      {children}
    </AuthContext.Provider>
  );
};