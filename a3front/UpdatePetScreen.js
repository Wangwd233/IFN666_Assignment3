import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from './components/AuthContext';
import { API_KEY } from '@env';

const UpdatePetScreen = ({ route, navigation }) => {
  const { pet } = route.params;
  const { username } = useContext(AuthContext);
  const [petname, setPetname] = useState(pet.petname);
  const [category, setCategory] = useState(pet.category);
  const [age, setAge] = useState(pet.age.toString());
  const [weight, setWeight] = useState(pet.weight.toString());

  const handleUpdatePet = async () => {
    try {
      const response = await fetch(`${API_KEY}/pets/${pet.id}`, {
        method: 'PUT',
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
        Alert.alert('Pet Updated', 'Your pet has been updated successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('Main') },
        ]);
      } else {
        Alert.alert('Error', data.error || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDeletePet = async () => {
    try {
      const response = await fetch(`http://192.168.1.2:3000/pets/${pet.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Pet Deleted', 'Your pet has been deleted successfully.', [
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
      <Text style={styles.header}>Update Pet</Text>
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
      <Button title="Update Pet" onPress={handleUpdatePet} />
      <Button title="Delete Pet" onPress={handleDeletePet} color="red" />
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

export default UpdatePetScreen;