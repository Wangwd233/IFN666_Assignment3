import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { SettingsContext } from './components/SettingsContext';
import licenses from './licenses.json';

const AboutScreen = () => {
  const { fontSize, fontColor, backgroundColor } = useContext(SettingsContext);
  const [visibleLicenses, setVisibleLicenses] = useState(10);

  const showMoreLicenses = () => {
    setVisibleLicenses(visibleLicenses + 10);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.container}>
        <Text style={[styles.header, { fontSize, color: fontColor }]}>
          About This App
        </Text>
        <Text style={[styles.content, { fontSize, color: fontColor }]}>
          This is a pets and animals care application, in this app you can add pets into the app and arrange their feeding time.
        </Text>
        <Text style={[styles.subheader, { fontSize, color: fontColor }]}>
          Open Source Licenses
        </Text>
        {Object.keys(licenses).slice(0, visibleLicenses).map((key) => (
          <View key={key} style={styles.licenseContainer}>
            <Text style={[styles.packageName, { fontSize, color: fontColor }]}>{key}</Text>
            <Text style={[styles.licenseType, { fontSize, color: fontColor }]}>License: {licenses[key].licenses}</Text>
            {licenses[key].repository && (
              <Text style={[styles.repository, { fontSize, color: fontColor }]}>Repository: {licenses[key].repository}</Text>
            )}
            <Text style={[styles.publisher, { fontSize, color: fontColor }]}>Publisher: {licenses[key].publisher || 'N/A'}</Text>
            <Text style={[styles.email, { fontSize, color: fontColor }]}>Email: {licenses[key].email || 'N/A'}</Text>
          </View>
        ))}
        {visibleLicenses < Object.keys(licenses).length && (
          <Button title="Show More" onPress={showMoreLicenses} />
        )}
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
  subheader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  licenseContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  packageName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  licenseType: {
    fontSize: 16,
    marginTop: 5,
  },
  repository: {
    fontSize: 16,
    marginTop: 5,
    color: 'blue',
  },
  publisher: {
    fontSize: 16,
    marginTop: 5,
  },
  email: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default AboutScreen;