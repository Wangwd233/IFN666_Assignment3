import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from './components/AuthContext';
import { API_KEY } from '@env';

const AddPetScreen = ({ navigation }) => {
  const { username } = useContext(AuthContext); // Use username (email) from AuthContext
  const [petname, setPetname] = useState('');
  const [category, setCategory] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');

  const handleAddPet = async () => {
    try {
      const response = await fetch(`${API_KEY}/pets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petname,
          category,
          owner: username,
          age: parseInt(age),
          weight: parseFloat(weight),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Pet Added', 'Your pet has been added successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('Main') },
        ]);
      } else {
        Alert.alert('Error', data.error || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Pet</Text>
      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        value={petname}
        onChangeText={setPetname}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <Button title="Add Pet" onPress={handleAddPet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default AddPetScreen;