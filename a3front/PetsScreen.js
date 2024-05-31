import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AuthContext } from './components/AuthContext';
import { API_KEY } from '@env';
import { SettingsProvider } from './components/SettingsContext';

const PetsScreen = ({ navigation }) => {
  const { username } = useContext(AuthContext); // Use username (email) from AuthContext
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${API_KEY}/pets?owner=${username}`);
        const data = await response.json();
        setPets(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setLoading(false);
      }
    };

    fetchPets();
  }, [username]);

  const renderItem = ({ item }) => (
    <SettingsProvider>
    <TouchableOpacity
      onPress={() => navigation.navigate('UpdatePetScreen', { pet: item })}
    >
        <View style={styles.row}>
        <Text style={styles.cell}>{item.petname}</Text>
        <Text style={styles.cell}>{item.category}</Text>
        <Text style={styles.cell}>{item.age}</Text>
        <Text style={styles.cell}>{item.weight}</Text>
        </View>
    </TouchableOpacity>
    </SettingsProvider>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Pets</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.row}>
              <Text style={styles.headerCell}>Name</Text>
              <Text style={styles.headerCell}>Category</Text>
              <Text style={styles.headerCell}>Age</Text>
              <Text style={styles.headerCell}>Weight</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PetsScreen;