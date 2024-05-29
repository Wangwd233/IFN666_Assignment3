import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SettingsContext } from './components/SettingsContext';

const AboutScreen = () => {
  const { fontSize, fontColor, backgroundColor } = useContext(SettingsContext);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
        <View style={styles.container}>
        <Text style={[styles.header, { fontSize, color: fontColor }]}>About</Text>
        <Text style={styles.content}>This is the About Page.</Text>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AboutScreen;