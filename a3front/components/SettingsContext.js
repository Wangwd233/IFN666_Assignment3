// import React, { createContext, useState } from 'react';

// export const SettingsContext = createContext();

// export const SettingsProvider = ({ children }) => {
//   const [fontSize, setFontSize] = useState(16);
//   const [fontColor, setFontColor] = useState('#000000');
//   const [backgroundColor, setBackgroundColor] = useState('rgba(255, 255, 255, 0.8)'); // Default background color

//   return (
//     <SettingsContext.Provider value={{ 
//         fontSize, 
//         setFontSize, 
//         fontColor, 
//         setFontColor, 
//         backgroundColor, 
//         setBackgroundColor }}>
//       {children}
//     </SettingsContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('rgba(255, 255, 255, 0.8)');

  // Function to load settings from AsyncStorage
  const loadSettings = async () => {
    try {
      const savedFontSize = await AsyncStorage.getItem('fontSize');
      const savedFontColor = await AsyncStorage.getItem('fontColor');
      const savedBackgroundColor = await AsyncStorage.getItem('backgroundColor');
      
      if (savedFontSize !== null) setFontSize(Number(savedFontSize));
      if (savedFontColor !== null) setFontColor(savedFontColor);
      if (savedBackgroundColor !== null) setBackgroundColor(savedBackgroundColor);
    } catch (error) {
      console.error("Failed to load settings", error);
    }
  };

  // Function to save settings to AsyncStorage
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('fontSize', fontSize.toString());
      await AsyncStorage.setItem('fontColor', fontColor);
      await AsyncStorage.setItem('backgroundColor', backgroundColor);
    } catch (error) {
      console.error("Failed to save settings", error);
    }
  };

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Save settings whenever they change
  useEffect(() => {
    saveSettings();
  }, [fontSize, fontColor, backgroundColor]);

  return (
    <SettingsContext.Provider value={{ 
      fontSize, 
      setFontSize, 
      fontColor, 
      setFontColor, 
      backgroundColor, 
      setBackgroundColor 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};