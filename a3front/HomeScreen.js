import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ServiceButton from './components/ServiceButton';
import { SettingsContext } from './components/SettingsContext';

const HomeScreen = () => {
  //text setting for fontsize and color
  const { fontSize, fontColor, backgroundColor } = useContext(SettingsContext);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.header, { fontSize, color: fontColor }]}>Select a service</Text>
        <ServiceButton 
          iconName="luggage" 
          title="Boarding" 
          description="in the sitter's home" 
          onPress={() => alert('Boarding')} 
        />
        <ServiceButton 
          iconName="home" 
          title="House Sitting" 
          description="in your home" 
          onPress={() => alert('House Sitting')} 
        />
        <ServiceButton 
          iconName="pets" 
          title="Drop-In Visits" 
          description="visits in your home" 
          onPress={() => alert('Drop-In Visits')} 
        />
        <ServiceButton 
          iconName="event" 
          title="Doggy Day Care" 
          description="in the sitter's home" 
          onPress={() => alert('Doggy Day Care')} 
        />
        <ServiceButton 
          iconName="directions-walk" 
          title="Dog Walking" 
          description="in your neighborhood" 
          onPress={() => alert('Dog Walking')} 
        />
        <ServiceButton 
          iconName="computer" 
          title="Dog Training" 
          description="video sessions through GoodPup" 
          onPress={() => alert('Dog Training')} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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

export default HomeScreen;