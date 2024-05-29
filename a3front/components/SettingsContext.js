import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('rgba(255, 255, 255, 0.8)'); // Default background color

  return (
    <SettingsContext.Provider value={{ 
        fontSize, 
        setFontSize, 
        fontColor, 
        setFontColor, 
        backgroundColor, 
        setBackgroundColor }}>
      {children}
    </SettingsContext.Provider>
  );
};