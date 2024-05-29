import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SettingsContext } from './SettingsContext';

const ServiceButton = ({ iconName, title, description, onPress }) => {
  const { fontSize, fontColor, backgroundColor } = useContext(SettingsContext);

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={iconName} size={24} color="green" />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { fontSize, color: fontColor }]}>{title}</Text>
        <Text style={[styles.description, { fontSize, color: fontColor }]}>{description}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  arrowContainer: {
    marginLeft: 'auto',
  },
});

export default ServiceButton;