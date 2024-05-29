import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { SettingsContext } from './components/SettingsContext';  // Import SettingsContext

const SettingsScreen = () => {
  const { fontSize, setFontSize, fontColor, setFontColor, backgroundColor, setBackgroundColor } = useContext(SettingsContext);  // Consume context

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.header, { fontSize, color: fontColor }]}>Example Font</Text>

      <View style={styles.setting}>
        <Text style={styles.label}>Font Size</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={30}
          value={fontSize}
          onValueChange={(value) => setFontSize(value)}
        />
        <Text>{fontSize.toFixed(0)}</Text>
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Font Color</Text>
        <Picker
          selectedValue={fontColor}
          style={styles.picker}
          onValueChange={(itemValue) => setFontColor(itemValue)}
        >
          <Picker.Item label="Black" value="#000000" />
          <Picker.Item label="Red" value="#FF0000" />
          <Picker.Item label="Green" value="#00FF00" />
          <Picker.Item label="Blue" value="#0000FF" />
        </Picker>
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Background Color</Text>
        <Picker
          selectedValue={backgroundColor}
          style={styles.picker}
          onValueChange={(itemValue) => setBackgroundColor(itemValue)}
        >
          <Picker.Item label="Semi-Transparent" value="rgba(255, 255, 255, 0.8)" />
          <Picker.Item label="White" value="#FFFFFF" />
          <Picker.Item label="Grey" value="#808080" />
          <Picker.Item label="Aqua" value="#00FFFF" />
          <Picker.Item label="Pink" value="#FFC0CB" />
          <Picker.Item label="Ocean Blue" value="#0077BE" />
          <Picker.Item label="Silver" value="#C0C0C0" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  setting: {
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default SettingsScreen;