import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ServiceButton from './components/ServiceButton';
import { SettingsContext } from './components/SettingsContext';

const HomeScreen = ({ navigation }) => {
  //text setting for fontsize and color
  const { fontSize, fontColor, backgroundColor } = useContext(SettingsContext);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.header, { fontSize, color: fontColor }]}>Select a service</Text>
        <ServiceButton 
          iconName="luggage" 
          title="My Pets" 
          description="View all my pets" 
          onPress={() => navigation.navigate('PetsScreen')} 
        />
        <ServiceButton 
          iconName="add" 
          title="Add Pet" 
          description="Add a new pet" 
          onPress={() => navigation.navigate('AddPetScreen')} 
        />
        <ServiceButton 
          iconName="event"
          title="Feed Pet" 
          description="Set feeding time for pets" 
          onPress={() => navigation.navigate('FeedPetScreen')} 
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